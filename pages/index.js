import Head from "next/head";
import TreeVisualizer from "../components/TreeVisualizer";
import "../styles/global.css";
import ScrollToTopButton from "../components/functions/ScrollToTopButton/ScrollToTopButton";

export default function Home() {
  return (
    <>
      <Head>
        <title>Segment Tree Visualizer</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <main>
        <h1 style={{ textAlign: "center", padding: "4px" }}>
          Segment Tree Visualizer
        </h1>
        <TreeVisualizer />
        <ScrollToTopButton />
      </main>
    </>
  );
}
