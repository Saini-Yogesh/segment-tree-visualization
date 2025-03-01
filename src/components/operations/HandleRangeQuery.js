import { highlightQueryNode, changePathColor } from "../SegmentTreeD3";

export async function handleRangeQuery(start, end, treeData, treeType, speed) {
  if (!treeData) {
    console.error("Tree data is undefined! Ensure the tree is built before querying.");
    return;
  }

  async function queryNode(node, parent = null) {
    if (!node) {
      if (treeType === "sum") return 0;
      if (treeType === "min") return Infinity;
      if (treeType === "max") return -Infinity;
    }

    const [nodeStart, nodeEnd] = node.range
      ?.replace("[", "")
      .replace("]", "")
      .split(",")
      .map(Number);

    // ✅ Skip nodes that don't contribute to the result
    if (nodeStart > end || nodeEnd < start) {
      if (treeType === "sum") return 0;
      if (treeType === "min") return Infinity;
      if (treeType === "max") return -Infinity;
    }

    // ✅ Highlight path while moving forward
    if (parent) {
      changePathColor(parent.range, node.range, "orange");
    }

    // ✅ If node is completely inside the range
    if (nodeStart >= start && nodeEnd <= end) {
      highlightQueryNode(node.range, "green", node.value);
      await new Promise((resolve) => setTimeout(resolve, speed));

      // ✅ Reset path color when backtracking
      if (parent) {
        changePathColor(parent.range, node.range, "#0c573e");
      }

      return node.value;
    }

    // ✅ Highlight partial contribution nodes
    highlightQueryNode(node.range, "yellow", node.value);
    await new Promise((resolve) => setTimeout(resolve, speed));

    // ✅ Query left and right children
    let leftValue = node.children?.[0] ? await queryNode(node.children[0], node) : null;
    let rightValue = node.children?.[1] ? await queryNode(node.children[1], node) : null;

    // ✅ Compute the final result based on the tree type
    let result;
    if (treeType === "sum") result = Number(leftValue) + Number(rightValue);
    else if (treeType === "min") result = Math.min(Number(leftValue), Number(rightValue));
    else if (treeType === "max") result = Math.max(Number(leftValue), Number(rightValue));

    // ✅ Animate result computation during backtracking
    highlightQueryNode(node.range, "blue", node.value);
    await new Promise((resolve) => setTimeout(resolve, speed));

    // ✅ Reset node and path colors after backtracking
    highlightQueryNode(node.range, "#0e695a", node.value);
    if (parent) {
      changePathColor(parent.range, node.range, "#0c573e");
    }

    return result;
  }

  let finalResult = await queryNode(treeData);

  console.log(`Final result for range [${start}, ${end}] = ${finalResult}`);
  return finalResult;
}
