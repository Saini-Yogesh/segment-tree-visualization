import HomePage from "../components/Home";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export const metadata = {
  title: "Segment Tree Visualizer | Range Queries & Lazy Propagation Animation",
  description: "Interactive Segment Tree Visualizer to learn and simulate range sum, range min/max queries, point updates, and range updates using lazy propagation with step-by-step animations.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "segment tree visualizer",
    "segment tree simulator",
    "segment tree animation",
    "range query visualization",
    "lazy propagation visualization",
    "dsa visualizer",
    "segment tree range sum query",
    "range updates simulation",
    "competitive programming segment tree"
  ],
  openGraph: {
    title: "Segment Tree Visualizer | Interactive Data Structure Animation",
    description: "Interactive Segment Tree Visualizer to learn and simulate range sum, range min/max queries, point updates, and range updates using lazy propagation with step-by-step animations.",
    url: "https://segment-tree-visualization.vercel.app/",
  },
  twitter: {
    title: "Segment Tree Visualizer | Interactive Data Structure Animation",
    description: "Interactive Segment Tree Visualizer to learn and simulate range sum, range min/max queries, point updates, and range updates using lazy propagation with step-by-step animations.",
  }
};

export default function Home() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
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
      <div className="visualizer-page-wrapper">
        <h1 className="visualizer-title">
          Segment Tree Visualizer
        </h1>
        <div className="visualizer-container-inner">
          <HomePage />
        </div>
      </div>

      {/* SEO Descriptive Content Section - Visually Hidden, fully indexable by search engine crawlers */}
      <div className="sr-only">
        <section>
          <h2>Interactive Segment Tree Visualizer & Simulator</h2>
          <p>
            Welcome to the ultimate <strong>Segment Tree Visualizer</strong>—an interactive tool designed to help developers, students, and competitive programmers master range-based queries and update algorithms. This simulator renders the entire tree hierarchy using D3.js, letting you watch the internal mechanics of divide-and-conquer tree builds, point updates, and lazy propagation range updates step-by-step.
          </p>

          <h3>Key Features of the Segment Tree Visualizer</h3>
          <ul>
            <li>
              <strong>Interactive Tree Construction:</strong> Input your custom integer array, select a query type (Sum, Min, or Max), and watch the simulator divide segments in half and build the tree nodes recursively.
            </li>
            <li>
              <strong>Animated Range Queries:</strong> Query ranges like <code>[L, R]</code> and observe how the search algorithm categorizes overlaps (complete overlap, partial overlap, or no overlap) and aggregates segment results.
            </li>
            <li>
              <strong>Point & Range Updates:</strong> Update values at a single index or apply updates across an entire subarray. The visualizer shows exactly how parent values re-evaluate and how lazy markers resolve.
            </li>
            <li>
              <strong>Lazy Propagation Animations:</strong> Visualize deferred updates in real-time. Watch the simulator attach lazy values to upper segment boundaries and push them down to child nodes only when accessed.
            </li>
            <li>
              <strong>Speed Customization:</strong> Adjust the animation speed slider from slow step-by-step details to fast sweeps, making it easy to learn tree traversals at your own pace.
            </li>
          </ul>

          <h3>How to Use the Visualizer</h3>
          <ol>
            <li>
              <strong>Initialize the Array:</strong> Use the sidebar input options to define an array. You can type comma-separated values (e.g., <code>1, 3, -2, 8, -7</code>) or load presets.
            </li>
            <li>
              <strong>Choose Segment Tree Type:</strong> Select the merge logic. Choose <strong>Sum</strong> for range sums, <strong>Min</strong> for Range Minimum Queries (RMQ), or <strong>Max</strong> for Range Maximum Queries.
            </li>
            <li>
              <strong>Run Operations:</strong>
              <ul>
                <li><strong>Query:</strong> Set start and end indices and click Query to trace the query overlap traversal.</li>
                <li><strong>Point Update:</strong> Specify an index and value offset to modify a single leaf node.</li>
                <li><strong>Range Update:</strong> Specify boundaries and a value to trigger the Lazy Propagation sequence.</li>
              </ul>
            </li>
          </ol>

          <h3>Deepen Your Segment Tree Knowledge</h3>
          <p>
            To help you grasp the underlying theory and master implementing this data structure in your code editor, we have written comprehensive reference guides:
          </p>
          <ul>
            <li>
              📚 <strong><Link href="/segment-tree">Segment Tree Tutorial & Implementation Guide</Link></strong>: A deep dive into tree structure, recursive build methods, and point updates with C++ code.
            </li>
            <li>
              ⚡ <strong><Link href="/lazy-propagation-in-segment-tree">Lazy Propagation Guide</Link></strong>: Learn the push operation, array representations, and how to optimize range updates from <code>O(N)</code> to <code>O(log N)</code>.
            </li>
            <li>
              ⏱️ <strong><Link href="/segment-tree-time-complexity">Time & Space Complexity Proofs</Link></strong>: Study the mathematical proofs behind build operations, query traversals, and why a segment tree array requires <code>4 * N</code> size.
            </li>
            <li>
              ⚖️ <strong><Link href="/segment-tree-vs-fenwick-tree">Segment Tree vs. Fenwick Tree</Link></strong>: Compare segment trees with Binary Indexed Trees (BIT) to choose the right data structure for competitive programming.
            </li>
            <li>
              💼 <strong><Link href="/segment-tree-interview-questions">Top DSA Interview Questions</Link></strong>: Practice classic problems (Circular RMQ, Knight Tournament) with algorithmic breakdowns.
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
