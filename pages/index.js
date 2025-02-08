import Head from "next/head";
import TreeVisualizer from "../components/TreeVisualizer";
import "../styles/global.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Segment Tree Visualizer</title>
      </Head>
      <main>
        <h1 style={{ textAlign: "center", padding: "4px" }}>
          Segment Tree Visualizer
        </h1>
        <TreeVisualizer />
      </main>
    </>
  );
}
