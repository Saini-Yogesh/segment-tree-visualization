import { changeNodeAppearance, changePathColor } from "../TreeVisualizerSideBar";

export function handleUpdateIndex(index, newValue, treeData, setTreeData, treeType, speed) {
  return new Promise((resolve) => {  // ✅ Return a promise
    if (!treeData) {
      console.error("Tree data is undefined! Ensure the tree is built before updating.");
      resolve();
      return;
    }

    function updateLazyUI(node) {
      if (!node) return;
      changeNodeAppearance(node.range, "#0e695a", node.value, node.lazy);
    }

    // ✅ FIX: Proper lazy apply (apply + push + clear)
    function applyLazy(node, start, end) {
      if (Number(node.lazy) === 0) return;

      const lazyVal = Number(node.lazy);
      const curVal = Number(node.value);

      if (treeType === "sum")
        node.value = curVal + lazyVal * (end - start + 1);
      else
        node.value = curVal + lazyVal;

      // ✅ FIX: guard children individually
      if (node.children?.[0]) {
        node.children[0].lazy =
          Number(node.children[0].lazy ?? 0) + lazyVal;
        updateLazyUI(node.children[0]);
      }
      if (node.children?.[1]) {
        node.children[1].lazy =
          Number(node.children[1].lazy ?? 0) + lazyVal;
        updateLazyUI(node.children[1]);
      }

      node.lazy = 0;
      updateLazyUI(node);
    }

    async function updateNode(node, parent = null) {
      if (!node) return 0;

      const [start, end] = node.range
        .replace("[", "")
        .replace("]", "")
        .split(",")
        .map(Number);

      // ✅ FIX: Apply lazy correctly before going down
      applyLazy(node, start, end);

      if (start === end && start === Number(index)) {
        // ✅ Highlight node and update value
        node.value = Number(newValue);

        // ✅ Change node color and path color (if it has a parent)
        if (parent) changePathColor(parent.range, node.range, "red");
        changeNodeAppearance(node.range, "gray", newValue);

        await new Promise((resolve) => setTimeout(resolve, speed)); // ✅ Delay

        // ✅ Revert colors
        if (parent) changePathColor(parent.range, node.range, "#0e695a");
        changeNodeAppearance(node.range, "green", node.value);
        return node.value;
      }

      let leftValue = 0, rightValue = 0;
      const mid = Math.floor((start + end) / 2);

      // ✅ Highlight current node and its path from parent
      if (parent) changePathColor(parent.range, node.range, "red");
      changeNodeAppearance(node.range, "gray", node.value);
      await new Promise((resolve) => setTimeout(resolve, speed)); // ✅ Delay

      if (index <= mid) {
        leftValue = await updateNode(node.children[0], node);
        rightValue = node.children[1]?.value ?? 0;
      } else {
        leftValue = node.children[0]?.value ?? 0;
        rightValue = await updateNode(node.children[1], node);
      }

      leftValue = Number(leftValue);
      rightValue = Number(rightValue);

      if (treeType === "sum") node.value = leftValue + rightValue;
      else if (treeType === "min") node.value = Math.min(leftValue, rightValue);
      else if (treeType === "max") node.value = Math.max(leftValue, rightValue);


      // ✅ Update parent node color and path
      changeNodeAppearance(node.range, "black", node.value);
      await new Promise((resolve) => setTimeout(resolve, speed)); // ✅ Delay
      changeNodeAppearance(node.range, "#0e695a", node.value);

      // ✅ Revert path color after update
      if (parent) changePathColor(parent.range, node.range, "#0e695a");

      return node.value;
    }

    updateNode(treeData).then(() => {
      resolve();
    });
  });
}
