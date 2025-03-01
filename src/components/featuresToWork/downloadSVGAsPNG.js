import { toast } from "react-toastify";

const downloadSVGAsPNG = () => {
    const svgElement = document.getElementById("my-svg"); // Select the SVG
    if (!svgElement) {
        toast.error("SVG not found!");
        return;
    }

    // ✅ Get the actual bounding box (ensures full tree is captured)
    const bbox = svgElement.getBBox();
    const width = bbox.width + 20; // Add padding
    const height = bbox.height + 20;

    const scaleFactor = 10; // ✅ Higher scale for better quality

    // ✅ Create a High-Resolution Canvas
    const canvas = document.createElement("canvas");
    canvas.width = width * scaleFactor;
    canvas.height = height * scaleFactor;
    const ctx = canvas.getContext("2d");

    // ✅ Convert SVG to XML String
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);

    // ✅ Create an Image from the SVG
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
        // ✅ Clear background & set transparent
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.scale(scaleFactor, scaleFactor); // Scale for higher resolution
        ctx.translate(-bbox.x + 10, -bbox.y + 10); // Center the tree inside the PNG

        ctx.drawImage(img, 0, 0);

        // ✅ Convert Canvas to PNG and Download
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "segment-tree-high-quality.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        // toast.success("SVG downloaded as PNG! 🎉");
    };

    img.src = url; // ✅ Load SVG into Image for Rendering
};

export default downloadSVGAsPNG;
