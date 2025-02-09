import TreeVisualizer from "../components/TreeVisualizer";
import ScrollToTopButton from "../components/functions/ScrollToTopButton/ScrollToTopButton";

export default function Home() {
  return (
    <>
      <div>
        <h1 style={{ textAlign: "center", padding: "4px" }}>
          Segment Tree Visualizer
        </h1>
        <TreeVisualizer />
        <ScrollToTopButton />
      </div>
    </>
  );
}
