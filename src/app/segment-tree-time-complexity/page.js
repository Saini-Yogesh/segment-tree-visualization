import Link from "next/link";
import '@/components/styles/CommonSegmentTree.css';
import '@/components/styles/FAQSection.css';

export const metadata = {
  title: "Segment Tree Complexity: Time & Space Analysis Proofs",
  description: "Detailed time and space complexity analysis for Segment Trees. Understand O(N) tree build, O(log N) query/update, and 4N space allocation proofs.",
  alternates: {
    canonical: "/segment-tree-time-complexity",
  },
  keywords: [
    "segment tree time complexity",
    "segment tree space complexity",
    "why 4n size segment tree",
    "build segment tree complexity",
    "segment tree height proof",
    "range query time complexity",
    "lazy propagation complexity"
  ],
  openGraph: {
    title: "Segment Tree Complexity: Time & Space Analysis Proofs",
    description: "Detailed time and space complexity analysis for Segment Trees. Understand O(N) tree build, O(log N) query/update, and 4N space allocation proofs.",
    url: "https://segment-tree-visualization.vercel.app/segment-tree-time-complexity",
  },
  twitter: {
    title: "Segment Tree Complexity: Time & Space Analysis Proofs",
    description: "Detailed time and space complexity analysis for Segment Trees. Understand O(N) tree build, O(log N) query/update, and 4N space allocation proofs.",
  }
};

export default function SegmentTreeComplexityPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the space complexity of a Segment Tree?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The space complexity of a Segment Tree is O(N). In an array-based implementation, we allocate an array of size 4 * N (where N is the number of elements in the input array) to avoid index-out-of-bounds exceptions for trees that are not perfect binary trees."
        }
      },
      {
        "@type": "Question",
        "name": "Why does building a Segment Tree take O(N) time?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Building a Segment Tree takes O(N) time because it visits every node in the binary tree exactly once. The total number of nodes in a segment tree built on N elements is less than 4 * N, which simplifies to O(N) operations."
        }
      },
      {
        "@type": "Question",
        "name": "Why is the query complexity O(log N)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "At each level of the tree, the query algorithm visits at most 4 nodes. Since the height of the tree is bounded by O(log N), the maximum number of nodes visited is 4 * log N, making the total query time complexity O(log N)."
        }
      }
    ]
  };

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Segment Tree Time and Space Complexity Proofs",
    "description": "Comprehensive mathematical proofs and analysis of Segment Tree performance, including build, range queries, point updates, and space allocation guidelines.",
    "author": {
      "@type": "Person",
      "name": "Yogesh Saini"
    },
    "inLanguage": "en-US"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />

      <div className="st" style={{ paddingTop: "20px" }}>
        <div className="st-container">
          <h1 className="st-title">Segment Tree Time & Space Complexity</h1>

          <div className="st-highlight">
            <p className="st-text">
              When analyzing data structures for competitive programming and tech interviews, understanding the mathematical proofs behind their efficiency is essential. This page outlines the time and space complexity of Segment Trees, detailing why certain sizes are allocated and how operations scale.
            </p>
            <p className="st-text">
              💡 <strong>Interactive practice:</strong> You can witness these algorithms run step-by-step on our <Link href="/">Segment Tree Visualizer</Link>.
            </p>
          </div>

          <h2 className="st-heading">Complexity Matrix Summary</h2>
          <p className="st-text">
            Below is a summary of the time and space complexities for all primary Segment Tree operations:
          </p>

          {/* Responsive table wrapper container */}
          <div className="responsive-table-wrapper">
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#ffffff",
              overflow: "hidden"
            }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e5e7eb", color: "#2563eb", backgroundColor: "#f9fafb" }}>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "16px", fontWeight: "700" }}>Operation</th>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "16px", fontWeight: "700" }}>Time Complexity</th>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "16px", fontWeight: "700" }}>Space Complexity</th>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "16px", fontWeight: "700" }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "12px", fontWeight: "600", color: "#111827" }}>Build Tree</td>
                  <td style={{ padding: "12px", color: "#2563eb", fontWeight: "600" }}><code className="st-inline-code">O(N)</code></td>
                  <td style={{ padding: "12px", color: "#374151" }}><code className="st-inline-code">O(N)</code></td>
                  <td style={{ padding: "12px", color: "#4b5563" }}>Processes all nodes in a single recursive sweep.</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "12px", fontWeight: "600", color: "#111827" }}>Range Query</td>
                  <td style={{ padding: "12px", color: "#2563eb", fontWeight: "600" }}><code className="st-inline-code">O(log N)</code></td>
                  <td style={{ padding: "12px", color: "#374151" }}><code className="st-inline-code">O(log N)</code></td>
                  <td style={{ padding: "12px", color: "#4b5563" }}>Visits at most 4 nodes per tree level.</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "12px", fontWeight: "600", color: "#111827" }}>Point Update</td>
                  <td style={{ padding: "12px", color: "#2563eb", fontWeight: "600" }}><code className="st-inline-code">O(log N)</code></td>
                  <td style={{ padding: "12px", color: "#374151" }}><code className="st-inline-code">O(log N)</code></td>
                  <td style={{ padding: "12px", color: "#4b5563" }}>Traverses a single path from root to leaf node.</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "12px", fontWeight: "600", color: "#111827" }}>Range Update (Naive)</td>
                  <td style={{ padding: "12px", color: "#2563eb", fontWeight: "600" }}><code className="st-inline-code">O(N log N)</code></td>
                  <td style={{ padding: "12px", color: "#374151" }}><code className="st-inline-code">O(log N)</code></td>
                  <td style={{ padding: "12px", color: "#4b5563" }}>Without lazy propagation, updates N leaves individually.</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "12px", fontWeight: "600", color: "#111827" }}>Range Update (Lazy)</td>
                  <td style={{ padding: "12px", color: "#2563eb", fontWeight: "600" }}><code className="st-inline-code">O(log N)</code></td>
                  <td style={{ padding: "12px", color: "#374151" }}><code className="st-inline-code">O(log N)</code></td>
                  <td style={{ padding: "12px", color: "#4b5563" }}>Defers updates, making range modifications logarithmic. See <Link href="/lazy-propagation-in-segment-tree">Lazy propagation guide</Link>.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="st-heading">Time Complexity Proofs</h2>

          <h3>1. Why is building the tree O(N)?</h3>
          <p className="st-text">
            A Segment Tree on an array of size <code className="st-inline-code">N</code> is a binary tree where the leaf nodes correspond to elements of the input array.
          </p>
          <ul className="st-list">
            <li>Number of leaf nodes = <code className="st-inline-code">N</code></li>
            <li>Number of internal nodes in a full binary tree with <code className="st-inline-code">N</code> leaves is <code className="st-inline-code">N - 1</code></li>
            <li>Total number of nodes = <code className="st-inline-code">2N - 1</code></li>
          </ul>
          <p className="st-text">
            During tree construction, the algorithm is executed recursively. It visits each node in the tree exactly once to initialize its values and perform a constant time merge operation (like addition or min/max calculation). Thus, the total operations scale as <code className="st-inline-code">O(2N - 1)</code>, which simplifies to <strong><code className="st-inline-code">O(N)</code></strong>.
          </p>

          <h3>2. Why are queries and updates O(log N)?</h3>
          <p className="st-text">
            For both queries and updates, we start traversal at the root node and navigate downwards.
          </p>
          <p className="st-text">
            The height of the tree is bounded by <strong><code className="st-inline-code">H = ceil(log₂ N)</code></strong>. In a point update, we visit exactly one node per level (from root to leaf), doing a constant amount of work per step, resulting in a time complexity of <code className="st-inline-code">O(log N)</code>.
          </p>
          <p className="st-text">
            During a range query, we split search intervals. Mathematical proofs show that at any depth level of the segment tree, we visit at most 4 nodes. Since the height is <code className="st-inline-code">O(log N)</code>, the maximum number of visited nodes is bounded by <code className="st-inline-code">4 * log₂ N</code>. Hence, the worst-case query complexity is <strong><code className="st-inline-code">O(log N)</code></strong>.
          </p>

          <h2 className="st-heading">Space Complexity Proof (Why 4 * N?)</h2>
          <p className="st-text">
            A common source of confusion is why the flat array used to represent a Segment Tree is sized as <code className="st-inline-code">4 * N</code> instead of <code className="st-inline-code">2 * N</code>.
          </p>
          <p className="st-text">
            If <code className="st-inline-code">N</code> is a power of 2, the segment tree forms a perfect binary tree, and the total number of nodes is exactly <code className="st-inline-code">2N - 1</code>. Here, a size of <code className="st-inline-code">2N</code> would suffice.
          </p>
          <p className="st-text">
            However, when <code className="st-inline-code">N</code> is not a power of 2, the tree structure becomes slightly unbalanced at the bottom level, and we must represent it as a tree of height <code className="st-inline-code">H = ceil(log₂ N)</code>.
          </p>
          <p className="st-text">
            In the worst-case scenario, let <code className="st-inline-code">N = 2ᵏ + 1</code> (just slightly larger than a power of 2).
          </p>
          <ul className="st-list">
            <li>The height of the tree is <code className="st-inline-code">H = k + 1</code>.</li>
            <li>The number of nodes in a complete binary tree of height <code className="st-inline-code">H</code> is <code className="st-inline-code">2^(H+1) - 1 = 2^(k+2) - 1 = 4 * 2ᵏ - 1</code>.</li>
            <li>Since <code className="st-inline-code">N \approx 2ᵏ</code>, this matches <code className="st-inline-code">4 * N - 1</code>.</li>
          </ul>
          <p className="st-text">
            Therefore, to safely represent any arbitrary segment tree in a flat array using standard child-indexing formulas (<code className="st-inline-code">2 * i + 1</code> and <code className="st-inline-code">2 * i + 2</code>) without causing out-of-bounds errors, we must allocate an array of size <strong><code className="st-inline-code">4 * N</code></strong>.
          </p>

          <h2 className="st-heading">Frequently Asked Questions</h2>
          <div className="faq-item">
            <h3 className="faq-question">Can we reduce the space complexity?</h3>
            <p className="faq-answer st-text">
              Yes, using an iterative Segment Tree implementation (often called the Fenwick-like structure), space can be reduced to exactly <code className="st-inline-code">2 * N</code>. However, this structure is harder to adapt for lazy propagation. Learn more on our <Link href="/segment-tree-vs-fenwick-tree">Segment Tree vs. Fenwick Tree comparison</Link>.
            </p>
          </div>
          <div className="faq-item">
            <h3 className="faq-question">What is a Dynamic Segment Tree?</h3>
            <p className="faq-answer st-text">
              If the range boundaries are huge (e.g. up to <code className="st-inline-code">10⁹</code>) but queries are sparse, allocating <code className="st-inline-code">4 * N</code> is impossible. A Dynamic Segment Tree creates nodes on-the-fly using pointers, reducing space complexity to <code className="st-inline-code">O(Q log N)</code>, where Q is the number of queries.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
