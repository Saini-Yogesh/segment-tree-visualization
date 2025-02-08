import { useState, useEffect } from "react";
import "../styles/InputSection.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

export default function InputSection({
  onBuildTree,
  onUpdateIndex,
  onRangeQuery,
  onRangeUpdate,
}) {
  const [sizeOfArray, setSizeOfArray] = useState(0);
  const [arrayInput, setArrayInput] = useState("1, 2, 3, 4, 5");
  const [treeType, setTreeType] = useState("sum");
  const [speed, setSpeed] = useState(800);

  // States for handling query visibility and inputs
  const [showUpdateIndex, setShowUpdateIndex] = useState(false);
  const [showRangeQuery, setShowRangeQuery] = useState(false);
  const [showRangeUpdate, setShowRangeUpdate] = useState(false);

  const handleToggleQuery = (queryType) => {
    setShowUpdateIndex(queryType === "updateIndex" && !showUpdateIndex);
    setShowRangeQuery(queryType === "rangeQuery" && !showRangeQuery);
    setShowRangeUpdate(queryType === "rangeUpdate" && !showRangeUpdate);
  };

  const [index, setIndex] = useState(""); // For Update Index query
  const [value, setValue] = useState(""); // For Update Index value
  const [rangeStart, setRangeStart] = useState(""); // For Range Query and Range Update
  const [rangeEnd, setRangeEnd] = useState(); // For Range Query and Range Update

  const handleBuildTree = () => {
    const array = arrayInput
      .split(/[\s,]+/)
      .map((num) => parseInt(num.trim()))
      .filter((num) => !isNaN(num));

    if (array.length === 0) {
      toast.error("Please enter a valid array to build the tree!");
      return;
    }

    setSizeOfArray(array.length);
    onBuildTree(array, treeType, speed);
    // toast.success("Tree built successfully!");
  };

  const checkInRangeOrnot = (rangeStart, rangeEnd) => {
    if (
      rangeStart < 0 ||
      rangeStart >= sizeOfArray ||
      rangeStart >= rangeEnd ||
      rangeEnd < 0 ||
      rangeEnd >= sizeOfArray
    ) {
      return false;
    }
    return true;
  };

  const handleUpdateIndex = () => {
    if (index < 0 || index >= sizeOfArray) {
      toast.error("Invalid index. Please enter a valid index!");
      return;
    }

    onUpdateIndex(index, value);
    // toast.success(`Index ${index} updated to ${value}!`);
  };

  const handleRangeQuery = () => {
    if (!checkInRangeOrnot(rangeStart, rangeEnd)) {
      toast.error("Invalid range for query!");
      return;
    }
    onRangeQuery(rangeStart, rangeEnd);
    // toast.info(
    //   `ℹ️ Query result displayed for range [${rangeStart}, ${rangeEnd}]`
    // );
  };

  const handleRangeUpdate = () => {
    if (!checkInRangeOrnot(rangeStart, rangeEnd)) {
      toast.error("Invalid range for update!");
      return;
    }
    onRangeUpdate(rangeStart, rangeEnd, value);
    // toast.success(`Range [${rangeStart}, ${rangeEnd}] updated to ${value}!`);
  };

  useEffect(() => {
    handleBuildTree();
  }, []);

  return (
    <div className="input-section">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      {/* tree-type-options */}
      <span className="tree-type-options">
        <p
          className={treeType === "sum" ? "current-tree-type-options" : ""}
          onClick={() => setTreeType("sum")}
        >
          SUM SEGMENT TREE
        </p>
        <p
          className={treeType === "min" ? "current-tree-type-options" : ""}
          onClick={() => setTreeType("min")}
        >
          MIN SEGMENT TREE
        </p>
        <p
          className={treeType === "max" ? "current-tree-type-options" : ""}
          onClick={() => setTreeType("max")}
        >
          MAX SEGMENT TREE
        </p>
      </span>

      {/* input Array */}
      <label htmlFor="input-array">Enter Array:</label>
      <input
        type="text"
        value={arrayInput}
        onChange={(e) => setArrayInput(e.target.value)}
        placeholder="Enter array (comma or space separated)"
      />
      <button onClick={handleBuildTree} className="build-buttons">
        Build Tree
      </button>

      {/* speed range */}
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
            <label htmlFor="range-start">Start Range:</label>
            <input
              id="range-start"
              type="number"
              value={rangeStart === null ? "" : rangeStart}
              onChange={(e) =>
                setRangeStart(
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
              placeholder="Start Range"
            />
            <label htmlFor="range-end">End Range:</label>
            <input
              id="range-end"
              type="number"
              value={rangeEnd === null ? "" : rangeEnd}
              onChange={(e) =>
                setRangeEnd(
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
              placeholder="End Range"
            />
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
            <label htmlFor="range-update-start">Start Range:</label>
            <input
              id="range-update-start"
              type="number"
              value={rangeStart === null ? "" : rangeStart}
              onChange={(e) =>
                setRangeStart(
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
              placeholder="Start Range"
            />
            <label htmlFor="range-update-end">End Range:</label>
            <input
              id="range-update-end"
              type="number"
              value={rangeEnd === null ? "" : rangeEnd}
              onChange={(e) =>
                setRangeEnd(
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
              placeholder="End Range"
            />
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
