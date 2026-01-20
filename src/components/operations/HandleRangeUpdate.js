import { changeNodeAppearance, changePathColor } from "../TreeVisualizerSideBar";

export const handleRangeUpdate = async (
  l,
  r,
  val,
  treeData,
  treeType,
  speed
) => {
  if (!treeData) {
    console.error("Tree data is undefined!");
    return;
  }

  function applyLazy(node, start, end) {
    if (Number(node.lazy) !== 0) {
      const lazyVal = Number(node.lazy);

      if (treeType === "sum")
        node.value = Number(node.value) + lazyVal * (end - start + 1);
      else
        node.value = Number(node.value) + lazyVal;

      if (node.children?.[0]) {
        node.children[0].lazy =
          Number(node.children[0].lazy) + lazyVal;
      }

      if (node.children?.[1]) {
        node.children[1].lazy =
          Number(node.children[1].lazy) + lazyVal;
      }

      node.lazy = 0;
    }
  }

  async function rangeUpdate(node, parent = null) {
    if (!node) return;

    const [start, end] = node.range
      .replace("[", "")
      .replace("]", "")
      .split(",")
      .map(Number);


    applyLazy(node, start, end);

    // no overlap
    if (l > end || r < start)
      return;

    // full overlap
    if (l <= start && end <= r) {
      const addVal = Number(val);


      if (treeType === "sum")
        node.value = Number(node.value) + addVal * (end - start + 1);
      else
        node.value = Number(node.value) + addVal;

      if (start !== end) {
        if (node.children?.[0]) {
          node.children[0].lazy =
            Number(node.children[0].lazy) + addVal;
        }
        if (node.children?.[1]) {
          node.children[1].lazy =
            Number(node.children[1].lazy) + addVal;
        }
      }

      if (parent) changePathColor(parent.range, node.range, "red");
      changeNodeAppearance(node.range, "yellow", node.value, node.lazy);
      await new Promise((r) => setTimeout(r, speed));
      if (parent) changePathColor(parent.range, node.range, "#0e695a");
      changeNodeAppearance(node.range, "#0e695a", node.value, node.lazy);

      return;
    }

    // partial overlap

    if (parent) changePathColor(parent.range, node.range, "red");
    changeNodeAppearance(node.range, "yellow", node.value, node.lazy);
    await new Promise((r) => setTimeout(r, speed));

    if (node.children?.[0]) await rangeUpdate(node.children[0], node);
    if (node.children?.[1]) await rangeUpdate(node.children[1], node);

    const leftVal = Number(node.children?.[0]?.value ?? 0);
    const rightVal = Number(node.children?.[1]?.value ?? 0);

    if (treeType === "sum") node.value = leftVal + rightVal;
    else if (treeType === "min") node.value = Math.min(leftVal, rightVal);
    else if (treeType === "max") node.value = Math.max(leftVal, rightVal);

    changeNodeAppearance(node.range, "black", node.value, node.lazy);
    await new Promise((r) => setTimeout(r, speed));
    changeNodeAppearance(node.range, "#0e695a", node.value, node.lazy);

    if (parent) changePathColor(parent.range, node.range, "#0e695a");
  }

  await rangeUpdate(treeData);
};
