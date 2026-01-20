"use client"
import { useState, useEffect } from "react";
import "./styles/InputSideBar.css";
import { toast } from "react-toastify";

export default function InputSection({
  onBuildTree,
  onUpdateIndex,
  onRangeQuery,
  onRangeUpdate,
}) {
  const [sizeOfArray, setSizeOfArray] = useState(0);
  const [arrayInput, setArrayInput] = useState("1, 2, 3, 4, 5, 6");
  const [treeType, setTreeType] = useState("sum");
  const [speed, setSpeed] = useState(1000);

  // States for handling query visibility and inputs
  const [showUpdateIndex, setShowUpdateIndex] = useState(false);
  const [showRangeQuery, setShowRangeQuery] = useState(false);
  const [showRangeUpdate, setShowRangeUpdate] = useState(false);

  const handleToggleQuery = (queryType) => {
    setShowUpdateIndex(queryType === "updateIndex" && !showUpdateIndex);
    setShowRangeQuery(queryType === "rangeQuery" && !showRangeQuery);
    setShowRangeUpdate(queryType === "rangeUpdate" && !showRangeUpdate);
  };

  const [index, setIndex] = useState("1"); // For Update Index query
  const [value, setValue] = useState("1"); // For Update Index value
  const [rangeStart, setRangeStart] = useState("3"); // For Range Query and Range Update
  const [rangeEnd, setRangeEnd] = useState("5"); // For Range Query and Range Update

  const checkInRangeOrnot = (rangeStart, rangeEnd) => {
    if (
      rangeStart > rangeEnd ||
      rangeStart < 0 ||
      rangeEnd < 0 ||
      rangeStart >= sizeOfArray ||
      rangeEnd >= sizeOfArray
    ) {
      return false;
    }
    return true;
  };

  const handleBuildTree = async (customSpeed) => {
    const array = arrayInput
      .split(/[\s,]+/)
      .map((num) => parseInt(num.trim()))
      .filter((num) => !isNaN(num));

    if (array.length === 0) {
      toast.error("Please enter a valid array to build the tree!");
      return;
    }

    setSizeOfArray(array.length);
    onBuildTree(array, treeType, customSpeed);
  };

  const handleUpdateIndex = () => {
    if (index < 0 || index >= sizeOfArray) {
      toast.error("Invalid index. Please enter a valid index!");
      return;
    }
    onUpdateIndex(index, value, treeType, speed);
  };

  const handleRangeQuery = () => {
    if (!checkInRangeOrnot(rangeStart, rangeEnd)) {
      toast.error("Invalid range for query!");
      return;
    }
    onRangeQuery(rangeStart, rangeEnd, treeType, speed);
  };

  const handleRangeUpdate = () => {
    if (!checkInRangeOrnot(rangeStart, rangeEnd)) {
      toast.error("Invalid range for update!");
      return;
    }
    onRangeUpdate(rangeStart, rangeEnd, value, treeType, speed);
  };

  useEffect(() => {
    handleBuildTree(0);
  }, [treeType]);

  return (
    <div className="input-section">
      {/* tree-type-options */}
      <div className="tree-type-section">
        <p className="tree-type-label">Select Segment Tree Type:- </p>

        <div className="tree-type-options">
          <button
            className={treeType === "sum" ? "active" : ""}
            onClick={() => setTreeType("sum")}
          >
            SUM
          </button>

          <button
            className={treeType === "min" ? "active" : ""}
            onClick={() => setTreeType("min")}
          >
            MIN
          </button>

          <button
            className={treeType === "max" ? "active" : ""}
            onClick={() => setTreeType("max")}
          >
            MAX
          </button>
        </div>
      </div>

      {/* input Array */}
      <label htmlFor="input-array">Enter Array:</label>
      <input
        type="text"
        value={arrayInput}
        onChange={(e) => setArrayInput(e.target.value)}
        placeholder="Enter array (comma or space separated)"
      />
      <button onClick={() => handleBuildTree(speed)} className="build-buttons">
        Build Tree
      </button>

      {/* speed range */}
      <span className="speed-control">
        <label className="speed-label">Speed:</label>
        <input
          className="speed-input"
          type="range"
          min="100"
          max="2000"
          step="10"
          value={2000 - speed}
          onChange={(e) => setSpeed(2000 - parseInt(e.target.value))}
        />
        <span className="speed-value">{(2000 - speed) / 1000}x</span>
      </span>

      {/* Update Index Query */}
      <div className={`query-section ${showUpdateIndex ? "expanded" : ""}`}>
        <p
          className="query-toggle"
          onClick={() => handleToggleQuery("updateIndex")}
        >
          {showUpdateIndex ? "▼" : "▶"} Update Index
        </p>

        {showUpdateIndex && (
          <div className="query-inputs">
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="update-index">Enter Index:</label>
                <input
                  id="update-index"
                  type="number"
                  value={index === null ? "" : index}
                  onChange={(e) =>
                    setIndex(e.target.value === "" ? null : Number(e.target.value))
                  }
                  placeholder="Enter index"
                />
              </div>
              <div className="input-group">
                <label htmlFor="update-value">Enter Value:</label>
                <input
                  id="update-value"
                  type="number"
                  value={value === null ? "" : value}
                  onChange={(e) =>
                    setValue(e.target.value === "" ? null : Number(e.target.value))
                  }
                  placeholder="Enter value"
                />
              </div>
            </div>
            <button onClick={handleUpdateIndex}>Update Index</button>
          </div>
        )}
      </div>

      {/* Range Query */}
      <div className={`query-section ${showRangeQuery ? "expanded" : ""}`}>
        <p
          className="query-toggle"
          onClick={() => handleToggleQuery("rangeQuery")}
        >
          {showRangeQuery ? "▼" : "▶"} Range Query
        </p>
        {showRangeQuery && (
          <div className="query-inputs">
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="range-start">Start Range:</label>
                <input
                  id="range-start"
                  type="number"
                  value={rangeStart === null ? "" : rangeStart}
                  onChange={(e) =>
                    setRangeStart(e.target.value === "" ? null : Number(e.target.value))
                  }
                  placeholder="Start"
                />
              </div>
              <div className="input-group">
                <label htmlFor="range-end">End Range:</label>
                <input
                  id="range-end"
                  type="number"
                  value={rangeEnd === null ? "" : rangeEnd}
                  onChange={(e) =>
                    setRangeEnd(e.target.value === "" ? null : Number(e.target.value))
                  }
                  placeholder="End"
                />
              </div>
            </div>

            <button onClick={handleRangeQuery}>Query Range</button>
          </div>
        )}
      </div>

      {/* Range Update */}
      <div className={`query-section ${showRangeUpdate ? "expanded" : ""}`}>
        <p
          className="query-toggle"
          onClick={() => handleToggleQuery("rangeUpdate")}
        >
          {showRangeUpdate ? "▼" : "▶"} Range Update
        </p>
        {showRangeUpdate && (
          <div className="query-inputs">
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="range-update-start">Start Range:</label>
                <input
                  id="range-update-start"
                  type="number"
                  value={rangeStart === null ? "" : rangeStart}
                  onChange={(e) =>
                    setRangeStart(e.target.value === "" ? null : Number(e.target.value))
                  }
                  placeholder="Start"
                />
              </div>

              <div className="input-group">
                <label htmlFor="range-update-end">End Range:</label>
                <input
                  id="range-update-end"
                  type="number"
                  value={rangeEnd === null ? "" : rangeEnd}
                  onChange={(e) =>
                    setRangeEnd(e.target.value === "" ? null : Number(e.target.value))
                  }
                  placeholder="End"
                />
              </div>
            </div>

            <label htmlFor="range-update-value">Enter Value:</label>
            <input
              id="range-update-value"
              type="number"
              value={value === null ? "" : value}
              onChange={(e) =>
                setValue(e.target.value === "" ? null : Number(e.target.value))
              }
              placeholder="Enter value"
            />
            <button onClick={handleRangeUpdate}>Update Range</button>
          </div>
        )}
      </div>
    </div>
  );
}
