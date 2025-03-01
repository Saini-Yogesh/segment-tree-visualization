import { tree } from "d3";
import { changeNodeAppearance, changePathColor } from "../SegmentTreeD3";

export function handleUpdateIndex(index, newValue, treeData, setTreeData, treeType, speed) {
  return new Promise((resolve) => {  // ✅ Return a promise
    if (!treeData) {
      console.error("Tree data is undefined! Ensure the tree is built before updating.");
      resolve();
      return;
    }

    async function updateNode(node, parent = null) {
      if (!node) return 0;

      const [start, end] = node.range
        ?.replace("[", "")
        .replace("]", "")
        .split(",")
        .map(Number);

      if (start === end && start === Number(index)) {
        // ✅ Highlight node and update value
        changeNodeAppearance(node.range, "green", newValue);
        // console.log(`Updating index ${index} to ${newValue}`);
        node.value = newValue;

        // ✅ Change node color and path color (if it has a parent)
        if (parent) changePathColor(parent.range, node.range, "red");
        changeNodeAppearance(node.range, "yellow", newValue);

        await new Promise((resolve) => setTimeout(resolve, speed)); // ✅ Delay

        // ✅ Revert colors
        if (parent) changePathColor(parent.range, node.range, "#0e695a");
        changeNodeAppearance(node.range, "#0e695a", newValue);
        return node.value;
      }

      let leftValue = 0, rightValue = 0;

      // console.log(node.children);

      // ✅ Highlight current node and its path from parent
      if (parent) changePathColor(parent.range, node.range, "red");
      changeNodeAppearance(node.range, "yellow", node.value);
      await new Promise((resolve) => setTimeout(resolve, speed)); // ✅ Delay

      if (index <= Math.floor((start + end) / 2)) {
        leftValue = await updateNode(node.children[0], node); // Left subtree
        rightValue = node.children[1] ? node.children[1].value : 0; // Keep right value
      } else {
        leftValue = node.children[0] ? node.children[0].value : 0; // Keep left value
        rightValue = await updateNode(node.children[1], node); // Right subtree
      }

      if (treeType === "sum") node.value = Number(leftValue) + Number(rightValue);
      else if (treeType === "min") node.value = Math.min(Number(leftValue), Number(rightValue));
      else if (treeType === "max") node.value = Math.max(Number(leftValue), Number(rightValue));
      // console.log(`Updating parent node ${node.range}: ${leftValue} + ${rightValue} = ${node.value}`);

      // ✅ Update parent node color and path
      changeNodeAppearance(node.range, "black", node.value);
      await new Promise((resolve) => setTimeout(resolve, speed)); // ✅ Delay
      changeNodeAppearance(node.range, "#0e695a", node.value);

      // ✅ Revert path color after update
      if (parent) changePathColor(parent.range, node.range, "#0e695a");

      return node.value;
    }

    updateNode(treeData).then(() => {
      setTreeData((prevTree) => prevTree); // ✅ Prevents full re-render but updates state
      resolve();
      return;
    });
  });
}
