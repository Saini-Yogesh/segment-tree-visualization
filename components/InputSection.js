import { useState, useEffect } from "react";
import "../styles/InputSection.css";

export default function InputSection({ onBuildTree }) {
  const [arrayInput, setArrayInput] = useState("1, 2, 3, 4, 5");
  const [treeType, setTreeType] = useState("sum");
  const [speed, setSpeed] = useState(800);

  const handleBuildTree = () => {
    const array = arrayInput
      .split(/[\s,]+/)
      .map((num) => parseInt(num.trim()))
      .filter((num) => !isNaN(num));
    onBuildTree(array, treeType, speed);
  };

  useEffect(() => {
    handleBuildTree();
  }, []);

  return (
    <div className="input-section">
      <input
        type="text"
        value={arrayInput}
        onChange={(e) => setArrayInput(e.target.value)}
        placeholder="Enter array (comma or space separated)"
      />
      <span className="tree-type-options">
        <p
          className={treeType === "sum" ? "active" : ""}
          onClick={() => setTreeType("sum")}
        >
          SUM SEGMENT TREE
        </p>
        <p
          className={treeType === "min" ? "active" : ""}
          onClick={() => setTreeType("min")}
        >
          MIN SEGMENT TREE
        </p>
        <p
          className={treeType === "max" ? "active" : ""}
          onClick={() => setTreeType("max")}
        >
          MAX SEGMENT TREE
        </p>
      </span>
      <button onClick={handleBuildTree} className="build-buttons">
        Build Tree
      </button>

      <span>
        <label>Speed:</label>
        <input
          type="range"
          min="100"
          max="2000"
          step="20"
          value={2000 - speed}
          onChange={(e) => setSpeed(2000 - parseInt(e.target.value))}
        />
      </span>
    </div>
  );
}
