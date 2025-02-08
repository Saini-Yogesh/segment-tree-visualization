import { useState } from "react";
import { buildSegmentTree } from "../utils/segmentTreeUtils";
import SegmentTreeD3 from "./SegmentTreeD3";
import InputSection from "./InputSection";
import "../styles/TreeVisualizer.css";
export default function TreeVisualizer() {
  const [treeData, setTreeData] = useState(null);
  const [animationDelay, setAnimationDelay] = useState(800);

  const handleBuildTree = (array, type, speed) => {
    const { tree, ranges } = buildSegmentTree(array, type);

    // Create hierarchical data for D3 visualization
    const rootNode = buildHierarchy(tree, ranges, 0);
    setTreeData(rootNode);
    setAnimationDelay(speed); // Update animation delay based on the slider value
  };

  const buildHierarchy = (tree, ranges, nodeIndex) => {
    if (nodeIndex >= tree.length || tree[nodeIndex] === 0) return null; // Skip zero values or null nodes

    const [start, end] = ranges[nodeIndex];

    // Build the node object
    const node = {
      name: `${nodeIndex}`,
      value: `${tree[nodeIndex]}`,
      range: `[${start}, ${end}]`,
      children: [],
    };

    // Recursively build left and right children
    const leftChild = buildHierarchy(tree, ranges, 2 * nodeIndex + 1);
    const rightChild = buildHierarchy(tree, ranges, 2 * nodeIndex + 2);

    // Only add non-null children
    if (leftChild) node.children.push(leftChild);
    if (rightChild) node.children.push(rightChild);
    return node;
  };

  return (
    <div className="container">
      <InputSection onBuildTree={handleBuildTree} />

      {treeData && (
        <div className="svg-container-wrapper">
          <SegmentTreeD3 data={treeData} animationDelay={animationDelay} />
        </div>
      )}
    </div>
  );
}
