import * as d3 from "d3";

const fitSegmentTree = () => {
    const svg = d3.select("#my-svg"); // Select the SVG element
    const g = svg.select("g"); // Select the group containing the tree

    if (!g.node()) return;

    // ✅ Define zoom behavior inside the function
    const zoom = d3.zoom().scaleExtent([0.3, 2]).on("zoom", (event) => {
        g.attr("transform", event.transform);
    });

    // ✅ Get bounding box of the entire tree
    const bbox = g.node().getBBox();
    const svgWidth = svg.node().clientWidth;
    const svgHeight = svg.node().clientHeight;

    // ✅ Compute scale factor to fit tree inside view
    const scale = Math.min(svgWidth / bbox.width, svgHeight / bbox.height) * 0.9; // 0.9 for padding

    // ✅ Compute translation to center tree
    const translateX = (svgWidth - scale * bbox.width) / 2 - scale * bbox.x;
    const translateY = (svgHeight - scale * bbox.height) / 2 - scale * bbox.y;

    // ✅ Apply zoom transformation smoothly
    svg.transition()
        .duration(500)
        .call(zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(scale));

    // ✅ Apply zoom behavior to SVG (if not applied already)
    svg.call(zoom);
};

export default fitSegmentTree;
