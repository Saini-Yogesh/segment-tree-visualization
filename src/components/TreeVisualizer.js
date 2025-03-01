"use client"
import { useState } from "react";
import { buildSegmentTree } from "./utils/segmentTreeUtils";
import SegmentTreeD3 from "./SegmentTreeD3";
import InputSection from "./InputSection";
import "./styles/TreeVisualizer.css";
import buildHierarchy from "./functions/BuildHierarchy/BuildHierarchy";
import { handleUpdateIndex } from "./operations/HandleUpdateIndex";
import { handleRangeQuery } from "./operations/HandleRangeQuery";
import { handleRangeUpdate } from "./operations/HandleRangeUpdate";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TreeVisualizer() {
  const [treeData, setTreeData] = useState(null);
  const [animationDelay, setAnimationDelay] = useState(800);

  const handleBuild = (array, type, speed) => {
    const { tree, ranges } = buildSegmentTree(array, type);

    // Create hierarchical data for D3 visualization
    const rootNode = buildHierarchy(tree, ranges, 0);
    setTreeData(rootNode);
    setAnimationDelay(speed); // Update animation delay based on the slider value
  };

  const handleUpdate = async (index, newValue, treeType, speed) => {
    if (!treeData) return;

    // ✅ Wait for `handleUpdateIndex` to finish before showing toast
    await handleUpdateIndex(index, newValue, treeData, setTreeData, treeType, speed);

    // ✅ Show toast after animation completes
    toast.success(`Index ${index} updated to ${newValue}!`);
  };

  const handleQuery = async (start, end, treeType, speed) => {
    if (!treeData) return;

    let result = await handleRangeQuery(start, end, treeData, treeType, speed);
    toast.info(`Query result for [${start}, ${end}] = ${result}`);
  };

  return (
    <div className="container">
      <InputSection
        onBuildTree={handleBuild}
        onUpdateIndex={handleUpdate}
        onRangeQuery={handleQuery}
        onRangeUpdate={handleRangeUpdate}
      />
      {treeData && (
        <div className="svg-container-wrapper">
          <SegmentTreeD3 data={treeData} animationDelay={animationDelay} />
        </div>
      )}
    </div>
  );
}
