import { highlightQueryNode, changePathColor } from "../SegmentTreeD3";

export async function handleRangeQuery(start, end, treeData) {
  if (!treeData) {
    console.error("Tree data is undefined! Ensure the tree is built before querying.");
    return;
  }

  const originalColors = new Map(); // ✅ Store original node colors
  const visitedPaths = new Set(); // ✅ Store visited paths uniquely

  async function queryNode(node, parent = null) {
    if (!node) return 0;

    const [nodeStart, nodeEnd] = node.range
      ?.replace("[", "")
      .replace("]", "")
      .split(",")
      .map(Number);

    // ✅ Skip redundant computations
    if (nodeStart > end || nodeEnd < start) return 0; // ✅ Completely outside range

    // ✅ Store original node color only once
    if (!originalColors.has(node.range)) {
      originalColors.set(node.range, "#0e695a"); // ✅ Default color
    }

    // ✅ Node completely inside range
    if (nodeStart >= start && nodeEnd <= end) {
      console.log(`Using node ${node.range} with value ${node.value}`);

      if (parent && !visitedPaths.has(`${parent.range}-${node.range}`)) {
        changePathColor(parent.range, node.range, "red");
        visitedPaths.add(`${parent.range}-${node.range}`);
      }

      highlightQueryNode(node.range, "green", node.value);
      await new Promise((resolve) => setTimeout(resolve, 300));
      return node.value;
    }

    // ✅ Change color only if the node contributes to the result
    if (parent && !visitedPaths.has(`${parent.range}-${node.range}`)) {
      changePathColor(parent.range, node.range, "orange");
      visitedPaths.add(`${parent.range}-${node.range}`);
    }

    highlightQueryNode(node.range, "yellow", node.value);
    await new Promise((resolve) => setTimeout(resolve, 300));

    let leftValue = node.children?.[0] ? await queryNode(node.children[0], node) : 0;
    let rightValue = node.children?.[1] ? await queryNode(node.children[1], node) : 0;

    // ✅ Revert colors after traversal
    highlightQueryNode(node.range, originalColors.get(node.range), node.value);

    return leftValue + rightValue;
  }

  let result = await queryNode(treeData);

  // ✅ Restore all nodes to their original color after animation completes
  originalColors.forEach((color, range) => highlightQueryNode(range, color));

  // ✅ Restore all paths to default color at the same time
  setTimeout(() => {
    visitedPaths.forEach((path) => {
      const [parent, child] = path.split("-");
      changePathColor(parent, child, "#d3d3d3"); // ✅ Ensure all paths reset uniformly
    });
  }, 500);

  console.log(`Final result for range [${start}, ${end}] = ${result}`);
  return result;
}
