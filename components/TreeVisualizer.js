import { useState } from "react";
import { buildSegmentTree } from "../utils/segmentTreeUtils";
import SegmentTreeD3 from "./SegmentTreeD3";
import InputSection from "./InputSection";
import "../styles/TreeVisualizer.css";
import buildHierarchy from "./functions/BuildHierarchy";
import { handleUpdateIndex } from "./operations/HandleUpdateIndex";
import { handleRangeQuery } from "./operations/HandleRangeQuery";
import { handleRangeUpdate } from "./operations/HandleRangeUpdate";

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

  return (
    <div className="container">
      <InputSection
        onBuildTree={handleBuildTree}
        onUpdateIndex={handleUpdateIndex}
        onRangeQuery={handleRangeQuery}
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
