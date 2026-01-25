"use client"
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./styles/TreeVisualizerSideBar.css";
import { toast } from "react-toastify";
import downloadSVGAsPNG from "./functions/downloadSVGAsPNG/downloadSVGAsPNG";
import fitSegmentTree from "./functions/FitInTheFrame/fitSegmentTree";
import { PiArrowElbowLeftDownBold } from "react-icons/pi";
import { FaBezierCurve } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { MdOutlineFitScreen } from "react-icons/md";

export default function SegmentTreeD3({ data, animationDelay }) {
  const svgRef = useRef();
  const [LINK_MODE, setLinkMode] = useState("curve");

  useEffect(() => {
    if (!data) return;

    const width = 1000;
    const height = 660;
    const nodeRadius = 20;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .call(
        d3.zoom()
          .scaleExtent([0.3, 2]) // Set zoom level limits 0.3x to 2x
          .on("zoom", (event) => {
            g.attr("transform", event.transform);
          })
      );

    svg.selectAll("*").remove();

    const g = svg.append("g").attr("transform", `translate(${width / 2}, 50)`);

    // Create layers for links and nodes
    const linkLayer = g.append("g").attr("class", "link-layer");
    const nodeLayer = g.append("g").attr("class", "node-layer");

    const root = d3.hierarchy(data);
    const horizontalSpacing = 150;
    const verticalSpacing = 150;

    const treeLayout = d3.tree().nodeSize([horizontalSpacing, verticalSpacing]);
    treeLayout(root);

    const sanitizeClassName = (range) =>
      `range-${range.replace(/[\[\],\s]/g, "-")}`;

    const renderLink = (source, target) => {
      let d;

      if (LINK_MODE === "curve") {
        d = d3
          .linkVertical()
          .x(d => d.x)
          .y(d => d.y)({
            source: { x: source.x, y: source.y },
            target: { x: target.x, y: target.y },
          });
      } else {
        const midY = (source.y + target.y) / 2;
        d =
          `M ${source.x},${source.y}
         V ${midY}
         H ${target.x}
         V ${target.y}
        `;
      }

      linkLayer
        .append("path")
        .attr("d", d)
        .attr(
          "class",
          `link-${sanitizeClassName(source.data.range)}-${sanitizeClassName(
            target.data.range
          )}`
        )
        .attr("stroke", "#d3d3d3")
        .attr("fill", "none")
        .attr("stroke-width", 2);
    };

    const renderNode = (node) => {
      const nodeGroup = nodeLayer
        .append("g")
        .attr("class", `node-${sanitizeClassName(node.data.range)}`)
        .attr("transform", `translate(${node.x},${node.y})`);

      // Render circle first
      nodeGroup
        .append("circle")
        .attr("r", nodeRadius)
        .attr("fill", "#d3d3d3")
        .attr("stroke", "white")
        .attr("stroke-width", 2);

      const [l, r] = node.data.range
        .replace("[", "")
        .replace("]", "")
        .split(",");

      // Display range above the node
      nodeGroup
        .append("text")
        .text(`[${l}...${r}]`)
        .attr("y", -nodeRadius - 12)
        .attr("text-anchor", "middle")
        .style("fill", "black")
        .style("font-size", "14px");

      // Placeholder for value inside the node
      nodeGroup
        .append("text")
        .text("?") // Initially empty text
        .attr("class", "node-value")
        .attr("y", 4)
        .attr("text-anchor", "middle")
        .style("fill", "white")
        .style("font-size", "16px");

      // ✅ lazy value below node
      nodeGroup
        .append("text")
        .attr("class", "node-lazy")
        .attr("y", nodeRadius + 12)
        .attr("text-anchor", "middle")
        .text(Number(node.data.lazy) ? `L: ${node.data.lazy}` : "");

    };

    const updateNodeValueOnBacktrack = (node) => {
      const nodeGroup = nodeLayer.select(
        `.node-${sanitizeClassName(node.data.range)}`
      );
      const nodeText = nodeGroup.select(".node-value");
      nodeText.text(`${node.data.value}`).style("visibility", "visible");
    };

    const highlightPath = (source, target, color, isBacktracking = false) => {
      const path = linkLayer
        .select(`.link-${sanitizeClassName(source.data.range)}-${sanitizeClassName(target.data.range)}`);

      // ✅ Ensure path exists before proceeding
      if (path.empty() || !path.node()) {
        console.warn(`Path from ${source.data.range} to ${target.data.range} not found.`);
        return;
      }

      const totalLength = path.node().getTotalLength();
      path
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
        .attr("stroke-dashoffset", isBacktracking ? 0 : totalLength)
        .transition()
        .duration(animationDelay)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", isBacktracking ? totalLength : 0);
    };


    const highlightNode = (node, color) => {
      nodeLayer
        .select(`.node-${sanitizeClassName(node.data.range)}`)
        .select("circle")
        .attr("fill", color);
    };

    const buildTreeAnimation = async (node) => {
      if (!node) return;

      // Render the node during descent
      renderNode(node);
      highlightNode(node, "#1e90ff");

      // Traverse left subtree
      if (node.children && node.children[0]) {
        await delay(animationDelay);
        renderLink(node, node.children[0]);
        highlightPath(node, node.children[0], "#1e90ff");
        await buildTreeAnimation(node.children[0]);
      }

      // Traverse right subtree
      if (node.children && node.children[1]) {
        await delay(animationDelay);
        renderLink(node, node.children[1]);
        highlightPath(node, node.children[1], "#1e90ff");
        await buildTreeAnimation(node.children[1]);
      }

      // Update node value during backtracking
      await delay(animationDelay);
      updateNodeValueOnBacktrack(node);
      highlightNode(node, "#0e695a");

      // Highlight the path back with green color on backtracking
      if (node.parent) {
        highlightPath(node.parent, node, "#0e695a");
      }

      nodeLayer
        .select(`.node-${sanitizeClassName(node.data.range)}`)
        .select("circle")
        .attr("stroke", "white");

      if (!node.parent) {
        toast.success("Segment Tree built successfully! 🎉");
      }
    };

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    buildTreeAnimation(root);
  }, [data, LINK_MODE]);

  return (
    <>
      <div id="svg-container">
        {/* ✅ Buttons container for absolute positioning */}
        <div className="buttons-container">
          <button onClick={fitSegmentTree}>
            <MdOutlineFitScreen />
          </button>
          <button
            onClick={() =>
              setLinkMode(m => (m === "curve" ? "elbow" : "curve"))
            }
            title={LINK_MODE === "curve" ? "Switch to Elbow View" : "Switch to Curve View"}
          >
            {LINK_MODE === "curve" ? <PiArrowElbowLeftDownBold /> : <FaBezierCurve />}
          </button>
          <button onClick={downloadSVGAsPNG}>
            <FaDownload />
          </button>
        </div>
        <svg id="my-svg" ref={svgRef}></svg>
      </div>
    </>
  );
}

export function changeNodeAppearance(range, color, newValue, lazyValue = 0) {
  const sanitizeClassName = (range) =>
    `range-${range.replace(/[\[\],\s]/g, "-")}`;

  const nodeSelection = d3.select(`.node-${sanitizeClassName(range)}`);

  // circle
  nodeSelection.select("circle").attr("fill", color);

  // value inside
  nodeSelection.select(".node-value").text(newValue);

  // ✅ lazy below
  nodeSelection
    .select(".node-lazy")
    .text(lazyValue ? `L: ${lazyValue}` : "");
}

export function changePathColor(parentRange, childRange, color, isBacktracking = false) {
  const sanitizeClassName = (range) =>
    `range-${range.replace(/[\[\],\s]/g, "-")}`;

  const path = d3.select(`.link-${sanitizeClassName(parentRange)}-${sanitizeClassName(childRange)}`);

  if (path.empty() || !path.node()) return; // Avoid errors if path is not found

  const totalLength = path.node().getTotalLength();

  path
    .attr("stroke", color)
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
    .attr("stroke-dashoffset", isBacktracking ? 0 : totalLength) // 🔹 Reverse direction for backtracking
    .transition()
    .duration(300)
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", isBacktracking ? totalLength : 0); // 🔹 Animate in reverse if backtracking
}
