import Link from "next/link";
import '@/components/styles/CommonSegmentTree.css';
import '@/components/styles/FAQSection.css';

export const metadata = {
  title: "Segment Tree Interview Questions & CP Practice Problems",
  description: "Master Segment Tree interview questions and competitive programming problems. Learn solutions for Circular RMQ, Xenia and Bit Operations, and CSES lists.",
  alternates: {
    canonical: "/segment-tree-interview-questions",
  },
  keywords: [
    "segment tree interview questions",
    "segment tree practice problems",
    "segment tree cses solutions",
    "xenia and bit operations solution",
    "circular rmq segment tree",
    "competitive programming segment tree questions",
    "dsa interview preparation"
  ],
  openGraph: {
    title: "Segment Tree Interview Questions & CP Practice Problems",
    description: "Master Segment Tree interview questions and competitive programming problems. Learn solutions for Circular RMQ, Xenia and Bit Operations, and CSES lists.",
    url: "https://segment-tree-visualization.vercel.app/segment-tree-interview-questions",
  },
  twitter: {
    title: "Segment Tree Interview Questions & CP Practice Problems",
    description: "Master Segment Tree interview questions and competitive programming problems. Learn solutions for Circular RMQ, Xenia and Bit Operations, and CSES lists.",
  }
};

export default function SegmentTreeInterviewPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What type of segment tree questions are asked in FAANG interviews?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "FAANG interviews often ask questions involving range sum queries, range minimum/maximum queries, and interval intersection detection. They test whether you can recognize the need for logarithmic range updates and implement lazy propagation correctly."
        }
      },
      {
        "@type": "Question",
        "name": "How do you handle circular range queries in Segment Trees?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For circular range queries (e.g. from index L to R where L > R), you split the query into two normal segment tree queries: [L, N-1] and [0, R], then merge their results."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between range add and range set operations in lazy propagation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A range add operation accumulates lazy updates (lazy[node] += value), whereas a range set operation overwrites previous updates (lazy[node] = value). When both operations exist, you must prioritize the overwrite and clear the accumulated add values."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="st" style={{ paddingTop: "20px" }}>
        <div className="st-container">
          <h1 className="st-title">Segment Tree Interview Questions & Practice</h1>

          <div className="st-highlight">
            <p className="st-text">
              Mastering the Segment Tree is crucial for competitive programming (Codeforces, CSES, AtCoder) and advanced technical interviews at high-tier tech companies. Interviewers use Segment Tree questions to test your understanding of divide-and-conquer strategies, binary trees, and performance optimization techniques.
            </p>
            <p className="st-text">
              💡 <strong>Tip:</strong> Visualizing tree states during dry-runs is highly helpful. Try executing queries and range updates in real-time on our <Link href="/">Segment Tree Animator</Link> to cement your understanding.
            </p>
          </div>

          <h2 className="st-heading">Classic Interview Questions & Solutions</h2>

          <h3>1. Range Minimum Query (RMQ)</h3>
          <p className="st-text">
            <strong>Problem:</strong> Given an array of integers, you need to answer multiple queries requesting the minimum value in subarray <code>[L, R]</code>, alongside single-element updates.
          </p>
          <p className="st-text">
            <strong>Solution Walkthrough:</strong>
          </p>
          <ul className="st-list">
            <li>Build a Segment Tree where each node stores the minimum value of its range boundaries: <code>seg[idx] = min(seg[left_child], seg[right_child])</code>.</li>
            <li>For queries, return <code>INT_MAX</code> when intervals do not overlap, and return the node value on complete overlap.</li>
            <li>Updates run in <code className="st-inline-code">O(log N)</code> by traversing to the target leaf, changing its value, and updating parent minimums upwards. See our <Link href="/segment-tree">Segment Tree Tutorial</Link> for syntax.</li>
          </ul>

          <h3>2. Xenia and Bit Operations (Codeforces 339D)</h3>
          <p className="st-text">
            <strong>Problem:</strong> You are given an array of size <code>2ⁿ</code>. In the first step, you perform bitwise OR operations on adjacent elements to build the parent level. In the second step, you perform bitwise XOR operations on the resulting values. This alternates at each tree level until only one root value remains. You must support point updates and output the root value.
          </p>
          <p className="st-text">
            <strong>Solution Walkthrough:</strong>
          </p>
          <ul className="st-list">
            <li>This is a classic Segment Tree problem where the merge operator alternates between <code>OR</code> and <code>XOR</code> based on the tree height (level).</li>
            <li>When building or updating the tree, keep track of the depth. If the current level is odd, merge child values using <code>val1 | val2</code>. If the level is even, merge using <code>val1 ^ val2</code>.</li>
            <li>Both construction and updates take standard segment tree times, making updates run in <code className="st-inline-code">O(log N)</code>.</li>
          </ul>

          <h3>3. CSES 1735 - Range Updates and Sums</h3>
          <div className="st-text">
            <strong>Problem:</strong> Implement a data structure that supports three operations over an array of size N:
            <ol className="st-list" style={{ marginTop: "10px" }}>
              <li>Add a value <code>x</code> to all elements in range <code>[L, R]</code>.</li>
              <li>Set all elements in range <code>[L, R]</code> to value <code>x</code>.</li>
              <li>Query the sum of elements in range <code>[L, R]</code>.</li>
            </ol>
          </div>
          <p className="st-text" style={{ marginTop: "14px" }}>
            <strong>Solution Walkthrough:</strong>
          </p>
          <ul className="st-list">
            <li>This is an advanced range update problem that requires <strong>Lazy Propagation</strong>. See our <Link href="/lazy-propagation-in-segment-tree">Lazy propagation guide</Link>.</li>
            <li>Because we have both "Add" and "Set" operations, our lazy nodes must store two separate flags: <code>lazyAdd</code> and <code>lazySet</code>.</li>
            <li>When pushing a "Set" update downward, it overwrites any pending "Add" values on child nodes. When pushing an "Add" update, it accumulates onto existing pending updates.</li>
          </ul>

          <h3>4. Circular RMQ (Codeforces 52C)</h3>
          <p className="st-text">
            <strong>Problem:</strong> Solve the Range Minimum Query problem on a circular array, where queries crossing the array boundaries (e.g. from index 8 to 2 in a 10-element array) are allowed.
          </p>
          <p className="st-text">
            <strong>Solution Walkthrough:</strong>
          </p>
          <ul className="st-list">
            <li>A circular range <code>[L, R]</code> where <code>L &gt; R</code> covers two distinct contiguous intervals: <code>[L, N-1]</code> and <code>[0, R]</code>.</li>
            <li>We simply split the query or range update into two separate segment tree function calls: one for <code>[L, N-1]</code> and another for <code>[0, R]</code>.</li>
            <li>We then take the minimum of the two query results to yield the final circular minimum. Time complexity remains <code className="st-inline-code">O(log N)</code>.</li>
          </ul>

          <h2 className="st-heading">Competitive Programming Tips</h2>
          <ul className="st-list">
            <li><strong>Coordinate Compression:</strong> If array indexes range up to <code>10⁹</code> but you only have <code>10⁵</code> updates, map the active query indices to a sorted coordinate list from <code>0</code> to <code>M-1</code> before building the tree.</li>
            <li><strong>Avoid Recursion Overhead:</strong> For tight time limits on simple queries, write an iterative segment tree to prevent recursive stack overhead.</li>
            <li><strong>Bitwise Operators:</strong> Use bit shifts like <code>idx &lt;&lt; 1 | 1</code> for left child index calculations and <code>(idx &lt;&lt; 1) + 2</code> for right child calculations to maximize cache speeds.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
