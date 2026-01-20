import { changeNodeAppearance, changePathColor } from "../TreeVisualizerSideBar";

export async function handleRangeQuery(start, end, treeData, treeType, speed) {
  if (!treeData) {
    console.error("Tree data is undefined! Ensure the tree is built before querying.");
    return;
  }

  function applyLazy(node, nodeStart, nodeEnd) {
    if (Number(node.lazy) === 0) return;

    const lazyVal = Number(node.lazy);
    const curVal = Number(node.value);

    if (treeType === "sum")
      node.value = curVal + lazyVal * (nodeEnd - nodeStart + 1);
    else
      node.value = curVal + lazyVal;

    // ✅ FIX: guard each child individually
    if (node.children?.[0]) {
      node.children[0].lazy =
        Number(node.children[0].lazy ?? 0) + lazyVal;
    }
    if (node.children?.[1]) {
      node.children[1].lazy =
        Number(node.children[1].lazy ?? 0) + lazyVal;
    }

    node.lazy = 0;
  }

  async function queryNode(node, parent = null) {
    if (!node) {
      if (treeType === "sum") return 0;
      if (treeType === "min") return Infinity;
      if (treeType === "max") return -Infinity;
    }

    const [nodeStart, nodeEnd] = node.range
      .replace("[", "")
      .replace("]", "")
      .split(",")
      .map(Number);

    // ✅ APPLY LAZY BEFORE ANY USE
    applyLazy(node, nodeStart, nodeEnd);

    // ✅ Skip nodes that don't contribute
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
      await new Promise((resolve) => setTimeout(resolve, speed));

      if (nodeStart == nodeEnd) {
        // ✅ Highlight leaf node
        changeNodeAppearance(node.range, "yellow", node.value);
        await new Promise((resolve) => setTimeout(resolve, speed));
        changeNodeAppearance(node.range, "#0c573e", node.value);
      }

      // ✅ Reset path color when backtracking
      if (parent) {
        changePathColor(parent.range, node.range, "#0c573e");
      }

      return Number(node.value);
    }

    // ✅ Highlight partial contribution nodes
    changeNodeAppearance(node.range, "yellow", node.value);
    await new Promise((resolve) => setTimeout(resolve, speed));

    // ✅ Query left and right children
    let leftValue = node.children?.[0]
      ? await queryNode(node.children[0], node)
      : treeType === "sum" ? 0 : treeType === "min" ? Infinity : -Infinity;

    let rightValue = node.children?.[1]
      ? await queryNode(node.children[1], node)
      : treeType === "sum" ? 0 : treeType === "min" ? Infinity : -Infinity;

    leftValue = Number(leftValue);
    rightValue = Number(rightValue);

    let result;
    if (treeType === "sum") result = leftValue + rightValue;
    else if (treeType === "min") result = Math.min(leftValue, rightValue);
    else if (treeType === "max") result = Math.max(leftValue, rightValue);

    // ✅ Animate result computation during backtracking
    changeNodeAppearance(node.range, "blue", node.value);
    await new Promise((resolve) => setTimeout(resolve, speed));

    // ✅ Reset node and path colors after backtracking
    changeNodeAppearance(node.range, "#0e695a", node.value);
    if (parent) {
      changePathColor(parent.range, node.range, "#0c573e");
    }

    return result;
  }

  let finalResult = await queryNode(treeData);

  return finalResult;
}
