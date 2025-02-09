"use client"
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./styles/SegmentTreeD3.css";

export default function SegmentTreeD3({ data, animationDelay }) {
  const svgRef = useRef();

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
        d3.zoom().on("zoom", (event) => {
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
      linkLayer
        .append("path")
        .attr(
          "d",
          d3
            .linkVertical()
            .x((d) => d.x)
            .y((d) => d.y)({
              source: { x: source.x, y: source.y },
              target: { x: target.x, y: target.y },
            })
        )
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

      // Display range above the node
      nodeGroup
        .append("text")
        .text(`${node.data.range}`)
        .attr("y", -nodeRadius - 12)
        .attr("text-anchor", "middle")
        .style("fill", "black")
        .style("font-size", "14px");

      // Placeholder for value inside the node
      nodeGroup
        .append("text")
        .text("") // Initially empty text
        .attr("class", "node-value")
        .attr("y", 4)
        .attr("text-anchor", "middle")
        .style("fill", "white")
        .style("font-size", "12px")
        .style("visibility", "hidden"); // Initially hidden
    };

    const updateNodeValueOnBacktrack = (node) => {
      const nodeGroup = nodeLayer.select(
        `.node-${sanitizeClassName(node.data.range)}`
      );
      const nodeText = nodeGroup.select(".node-value");
      nodeText.text(`${node.data.value}`).style("visibility", "visible");
    };

    const highlightPath = (source, target, color) => {
      linkLayer
        .select(
          `.link-${sanitizeClassName(source.data.range)}-${sanitizeClassName(
            target.data.range
          )}`
        )
        .attr("stroke", color);
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
    };

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    buildTreeAnimation(root);
  }, [data]);

  return (
    <>
      <div id="svg-container">
        <svg id="my-svg" ref={svgRef}></svg>
      </div>
    </>
  );
}
