"use client";

import HighlightedCode from "../../components/functions/HighlightedCode/HighlightedCode";
import { AllCodes } from "./AllCodes.js";
import '@/components/styles/CommonSegmentTree.css'

export default function SegmentTreePage() {
  return (
    <div className="st">
      <div className="st-container">
        <h1 className="st-title">What is a Segment Tree?</h1>

        <p className="st-text">
          A Segment Tree is a tree-based data structure used to efficiently
          handle range-based queries on an array. It allows us to query
          information (such as sum, minimum, or maximum) over a subarray and
          also update elements efficiently.
        </p>

        <p className="st-text">In simple terms, a Segment Tree is used when:</p>

        <ul className="st-list">
          <li>You need to answer range queries frequently</li>
          <li>The array values can change over time</li>
        </ul>

        <h2 className="st-heading">Why do we need a Segment Tree?</h2>

        <p className="st-text">
          Consider an array:{" "}
          <code className="st-inline-code">
            arr = [a&#8321;, a&#8322;, a&#8323;, a&#8324;, …, a&#8345;]
          </code>
        </p>

        <p className="st-text">Suppose we have two types of queries:</p>

        <ul className="st-list">
          <li>
            <strong>Range Query:</strong> Find the sum of elements from index l
            to r
          </li>
          <li>
            <strong>Update Query:</strong> Update the value at a specific index
          </li>
        </ul>

        <h2 className="st-heading">Problem with Prefix Sum</h2>

        <p className="st-text">
          Using a prefix sum array, we can answer range sum queries in
          <code className="st-inline-code"> O(1)</code> time. However, when an update happens:
        </p>

        <ul className="st-list">
          <li>The array value changes</li>
          <li>The prefix sum array must be rebuilt</li>
          <li>
            This rebuild takes <code className="st-inline-code">O(n)</code> time
          </li>
        </ul>

        <p className="st-text">
          If there are many update queries, the total time complexity becomes
          <code className="st-inline-code">O(q · n)</code>, which is not feasible for large inputs (e.g.,
          n = 10⁶).
        </p>

        <p className="st-text">
          This leads to <strong>TLE (Time Limit Exceeded)</strong>.
        </p>

        <h2 className="st-heading">How Segment Tree Solves This</h2>

        <p className="st-text">
          A Segment Tree solves this problem efficiently by:
        </p>

        <ul className="st-list">
          <li>
            Answering range queries in <code className="st-inline-code">O(log n)</code>
          </li>
          <li>
            Handling updates in <code className="st-inline-code">O(log n)</code>
          </li>
        </ul>

        <p className="st-text">So, even if we have many queries:</p>

        <ul className="st-list">
          <li>
            Total time complexity becomes <code className="st-inline-code">O(q log n)</code>
          </li>
          <li>This is efficient and feasible for large inputs</li>
        </ul>

        <h2 className="st-heading">Conclusion</h2>

        <ul className="st-list">
          <li>Prefix sums fail when frequent updates are involved</li>
          <li>Segment Trees handle both queries and updates efficiently</li>
          <li>
            It is a reliable and scalable solution for range-based problems
          </li>
        </ul>

        <p className="st-highlight">
          That is why Segment Trees are widely used in competitive programming
          and high-performance systems.
        </p>

        <h1 className="st-title">Structure of the Segment Tree</h1>

        <p className="st-text">
          We can take a <strong>divide-and-conquer</strong> approach when it
          comes to array segments. We compute and store the sum of the elements
          of the whole array, i.e., the sum of the segment
          <code className="st-inline-code"> a[0 … n - 1]</code>
        </p>

        <p className="st-text">
          We then split the array into two halves
          <code className="st-inline-code"> a[0 … (n - 1)/2]</code> and
          <code className="st-inline-code"> a[(n + 1)/2 … n - 1]</code> and
          compute the sum of each half and store them. Each of these two halves
          is again split into two smaller halves, and this process continues
          until all segments reach size 1.
        </p>

        <p className="st-text">
          These segments can be viewed as forming a binary tree. The root of
          this tree represents the segment <br />
          <code className="st-inline-code"> a[0 … n - 1]</code>, and each
          internal node has exactly two children. This is why the data structure
          is called a<strong> Segment Tree</strong>, even though in most
          implementations the tree is not constructed explicitly.
        </p>

        <p className="st-text">
          Below is a visual representation of a Segment Tree built over the
          array:
          <code className="st-inline-code"> a = [1, 3, -2, 8, -7]</code>
        </p>

        {/* Image placeholder */}
        <div className="st-image-wrapper">
          <img
            src="/segmentTreeImg.png"
            alt="Segment Tree Structure"
            className="st-image"
          />
        </div>

        {/* Height explanation */}
        <p className="st-text st-highlight">
          The height of a Segment Tree is <code className="st-inline-code">O(log n)</code>, because
          when moving from the root to the leaves, the size of the segment is
          reduced by approximately half at each level.
        </p>

        <h1 className="st-title">Construction of the Segment Tree</h1>

        <p className="st-text">
          Before constructing a Segment Tree, we need to decide two important
          things:
        </p>

        <ul className="st-list">
          <li>
            <strong>The value stored at each node</strong> — for example, in a
            sum Segment Tree, each node stores the sum of elements in its range
            <code className="st-inline-code">[l, r]</code>.
          </li>
          <li>
            <strong>The merge operation</strong> — this defines how the values
            of two child nodes are combined. In a sum Segment Tree, the values
            are merged by adding them.
          </li>
        </ul>

        <p className="st-text">
          A node is called a <strong>leaf node</strong> if its segment
          represents only a single element of the array. In that case, the value
          stored in the node is simply the corresponding array element.
        </p>

        <p className="st-text">
          To build the Segment Tree, we start from the leaf nodes and assign
          their values. Using the merge operation, we then compute the values of
          their parent nodes. This process continues until we reach the root
          node, which represents the entire array.
        </p>

        <p className="st-text">
          In practice, the construction is described recursively in the opposite
          direction, starting from the root node:
        </p>

        <ul className="st-list">
          <li>Recursively construct the left child node</li>
          <li>Recursively construct the right child node</li>
          <li>Merge the values of both children to compute the current node</li>
        </ul>

        <p className="st-text">
          By starting this process from the root node, we are able to construct
          the complete Segment Tree.
        </p>

        <p className="st-highlight">
          The time complexity of building a Segment Tree is
          <code className="st-inline-code"> O(n)</code>, assuming the merge operation takes constant
          time, since each node is processed exactly once.
        </p>

        <h1 className="st-title">Sum Queries and Update Queries</h1>

        <h2 className="st-heading">Sum Queries</h2>

        <p className="st-text">
          To compute the sum of a range{" "}
          <code className="st-inline-code">[l, r]</code>, we traverse the
          Segment Tree and use the precomputed sums stored in the nodes.
        </p>

        <ul className="st-list">
          <li>
            If the current node exactly matches the query range, return its
            stored sum.
          </li>
          <li>
            If the query lies fully in one child, recursively move to that
            child.
          </li>
          <li>
            If the query overlaps both children, split it, compute both parts,
            and add the results.
          </li>
        </ul>

        <p className="st-highlight">
          Since only a limited number of nodes are visited at each level and the
          height of the tree is <code className="st-inline-code">O(log n)</code>, the total time
          complexity is <code className="st-inline-code">O(log n)</code>.
        </p>

        <h2 className="st-heading">Update Queries</h2>

        <p className="st-text">
          An update query modifies a single element in the array. We recursively
          traverse the tree to the leaf node representing that index and update
          its value.
        </p>

        <p className="st-text">
          While returning back up the tree, we recompute the values of all
          affected parent nodes using the merge operation.
        </p>

        <p className="st-highlight">
          Since only one node per level is updated, the time complexity of an
          update query is also <code className="st-inline-code">O(log n)</code>.
        </p>

        <h1 className="st-title">Implementation</h1>

        <p className="st-text">
          There are may ways to implement a Segment Tree. One common approach is
          to use an array-based representation, where the tree is stored in a
          flat array. This method is efficient in terms of both time and space.
          if want to know why we use array to represent segment tree please
          refer to the{" "}
          <a href="https://cp-algorithms.com/data_structures/segment_tree.html#implementation">
            CP-Algorithms
          </a>
          .
        </p>

        <h2 className="st-heading">Array-Based Representation</h2>

        <p className="st-text">
          In an array-based representation, the Segment Tree is stored in an
          array of size <code className="st-inline-code">4 * n</code> to
          accommodate all nodes. The root node is at index 0, and for any node
          at index <code className="st-inline-code">i</code>:
        </p>
        <ul className="st-list">
          <li>
            The left child is at index{" "}
            <code className="st-inline-code">2 * i + 1</code>
          </li>
          <li>
            The right child is at index{" "}
            <code className="st-inline-code">2 * i + 2</code>
          </li>
        </ul>
        <p className="st-highlight">
          This <strong>Array-Based Representation</strong> allows for efficient traversal and updates without the
          need for explicit pointers.
        </p>

        <h2 className="st-heading">📌 Variable Notation</h2>

        <ul className="st-list">
          <li>
            <code className="st-inline-code">idx</code> → index of the current node in the
            segment tree array
          </li>
          <li>
            <code className="st-inline-code">l</code> → left boundary of the segment
            represented by the current node
          </li>
          <li>
            <code className="st-inline-code">r</code> → right boundary of the segment
            represented by the current node
          </li>
          <li>
            <code className="st-inline-code">ql</code> → left boundary of the query update
          </li>
          <li>
            <code className="st-inline-code">qr</code> → right boundary of the query update
          </li>
          <li>
            <code className="st-inline-code">pos</code> → index of the element for a point
            update
          </li>
          <li>
            <code className="st-inline-code">val</code> → value to be added during a point update
          </li>
        </ul>

        <h2 className="st-heading">Build Function</h2>
        <HighlightedCode code={AllCodes.buildCode} language="cpp" />

        <p className="st-text">
          The <code className="st-inline-code">build</code> function constructs
          the segment tree using a recursive <strong>divide-and-conquer</strong>{" "}
          strategy. It takes the current segment tree index{" "}
          <code className="st-inline-code">idx</code>, the array range{" "}
          <code className="st-inline-code">[l, r]</code>, and the input
          array <code className="st-inline-code">arr</code>.
        </p>

        <p className="st-text">
          When <code className="st-inline-code">l == r</code>, the
          recursion reaches a <strong>leaf node</strong>, representing a single
          element of the array. At this point, the value{" "}
          <code className="st-inline-code">arr[l]</code> is directly stored in{" "}
          <code className="st-inline-code">seg[idx]</code>.
        </p>

        <p className="st-text">
          Otherwise, the current range is split at{" "}
          <code className="st-inline-code">mid</code> into two subranges:
          <code className="st-inline-code">[l, mid]</code> and{" "}
          <code className="st-inline-code">[mid + 1, r]</code>. The function
          then recursively builds the left child at{" "}
          <code className="st-inline-code">2 * idx + 1</code> and the right
          child at <code className="st-inline-code">2 * idx + 2</code>.
        </p>

        <div className="st-highlight">
          <p className="st-text">
            After both children are constructed, the current node aggregates
            their values. In this implementation, the aggregation operation is
            <strong> sum</strong>:
            <code className="st-inline-code">
              seg[idx] = seg[2 * idx + 1] + seg[2 * idx + 2]
            </code>
            . This process continues upward until the root node is built.
          </p>
        </div>

        <h2 className="st-heading">Range Sum Query Function</h2>
        <HighlightedCode code={AllCodes.rangeSumQueryCode} language="cpp" />

        <p className="st-text">
          The <code className="st-inline-code">rangeSumQuery</code> function is
          used to compute the sum of elements within a given query range{" "}
          <code className="st-inline-code">[ql, qr]</code> using the segment tree.
          It operates on a node at index{" "}
          <code className="st-inline-code">idx</code> representing the segment{" "}
          <code className="st-inline-code">[l, r]</code>.
        </p>

        <p className="st-text">
          To answer a query efficiently, the algorithm evaluates three possible
          overlap cases between the current segment and the query range.
        </p>

        <ul className="st-list">
          <li>
            <strong>No Overlap:</strong> If the segment{" "}
            <code className="st-inline-code">[l, r]</code> lies completely
            outside the query range{" "}
            <code className="st-inline-code">[ql, qr]</code>, the function returns{" "}
            <code className="st-inline-code">0</code>, since it contributes
            nothing to the sum.
          </li>

          <li>
            <strong>Complete Overlap:</strong> If the segment{" "}
            <code className="st-inline-code">[l, r]</code> is fully
            contained within the query range{" "}
            <code className="st-inline-code">[ql, qr]</code>, the precomputed
            value <code className="st-inline-code">seg[idx]</code> is returned
            directly. This avoids unnecessary recursion.
          </li>

          <li>
            <strong>Partial Overlap:</strong> If the segment is partially inside
            and partially outside the query range, the segment is divided at{" "}
            <code className="st-inline-code">mid</code> into two halves:
            <code className="st-inline-code">[l, mid]</code> and{" "}
            <code className="st-inline-code">[mid + 1, r]</code>. The query
            is executed recursively on both children, and the final result is
            the sum of the left and right subqueries.
          </li>
        </ul>

        <div className="st-highlight">
          <p className="st-text">
            This operation is <strong>read-only</strong>. The segment tree is
            not modified during a range sum query, as no updates are required.
            The result is obtained purely through traversal and aggregation.
          </p>
        </div>

        <h2 className="st-heading">Point Update Function</h2>
        <HighlightedCode code={AllCodes.pointUpdateCode} language="cpp" />

        <p className="st-text">
          The <code className="st-inline-code">pointUpdate</code> operation
          updates the value at a specific array index and reflects this change
          in the segment tree. It takes five parameters: the target{" "}
          <code className="st-inline-code">index</code>, the new value{" "}
          <code className="st-inline-code">val</code>, the segment tree index{" "}
          <code className="st-inline-code">idx</code>, and the segment range{" "}
          <code className="st-inline-code">[l, r]</code>.
        </p>

        <p className="st-text">
          The update process follows a binary-search–like traversal. At each
          recursive step, the current segment{" "}
          <code className="st-inline-code">[l, r]</code> is divided at{" "}
          <code className="st-inline-code">mid</code> to determine whether the
          target index lies in the left subtree{" "}
          <code className="st-inline-code">[l, mid]</code> or the right
          subtree <code className="st-inline-code">[mid + 1, r]</code>.
        </p>

        <p className="st-text">
          This process continues recursively until{" "}
          <code className="st-inline-code">l === r</code>, which represents a{" "}
          <strong>leaf node</strong>. This node corresponds exactly to the update index,
          and its value is increased by{" "}
          <code className="st-inline-code">val</code>.
        </p>

        <div className="st-highlight">
          <p className="st-text">
            While returning from recursion, each ancestor node is recomputed to
            maintain correctness of the tree. For a sum segment tree, the parent
            value is updated as:
            <br />
            <code className="st-inline-code">
              seg[idx] = seg[2 * idx + 1] + seg[2 * idx + 2]
            </code>
            <br />
            This ensures that all affected ranges reflect the updated index.
          </p>
        </div>

        <h2 className="st-title">Complete Segment Tree Code</h2>
        <p className="st-text">
          Here is a sample code snippet for Segment Tree sum operations:
        </p>

        <HighlightedCode code={AllCodes.completeCode} language="cpp" />
        <h1 className="st-title">Practice Problem</h1>
        <p className="st-text">
          You can practice Segment Tree problems on various competitive
          programming platforms. Here are a few recommended problems to get you
          started:
        </p>

        <ul className="st-list">
          <li>
            <a
              href="https://codeforces.com/problemset/problem/339/D"
              target="_blank"
              rel="noreferrer"
            >
              Codeforces – Xenia and Bit Operations
            </a>
          </li>

          <li>
            <a
              href="https://codeforces.com/problemset/problem/1234/D"
              target="_blank"
              rel="noreferrer"
            >
              Codeforces – Distinct Characters Queries
            </a>
          </li>

          <li>
            <a
              href="https://codeforces.com/contest/356/problem/A"
              target="_blank"
              rel="noreferrer"
            >
              Codeforces – Knight Tournament (Beginner)
            </a>
          </li>

          <li>
            <a
              href="https://cses.fi/problemset/task/1143"
              target="_blank"
              rel="noreferrer"
            >
              CSES – Hotel Queries
            </a>
          </li>

          <li>
            <a
              href="https://codeforces.com/problemset/problem/52/C"
              target="_blank"
              rel="noreferrer"
            >
              Codeforces – Circular RMQ
            </a>
          </li>
        </ul>

        <p className="st-text">
          These problems will help you understand the implementation and
          application of Segment Trees in various scenarios. Happy coding!
        </p>

        <h1 className="st-title">Further Reading</h1>
        <p className="st-text">
          For more in-depth information on Segment Trees, consider exploring the
          following resources:
        </p>
        <ul className="st-list">
          <li>
            <a
              href="https://cp-algorithms.com/data_structures/segment_tree.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              CP-Algorithms: Segment Tree
            </a>{" "}
            – A comprehensive guide covering segment tree construction, queries,
            and point updates.
          </li>

          <li>
            <a
              href="https://www.geeksforgeeks.org/dsa/segment-tree-data-structure/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GeeksforGeeks: Segment Tree
            </a>{" "}
            – Explains the basics of segment trees, including build, query, and
            update operations.
          </li>

          <li>
            <a
              href="https://codeforces.com/edu/course/2/lesson/4/1/practice"
              target="_blank"
              rel="noopener noreferrer"
            >
              Codeforces: Segment Tree
            </a>
            – Introduction to classic segment trees, including build, range queries, and point updates.
            <br />
            <span className="st-muted" style={{ display: "block", marginTop: "6px" }}>
              <code style={{ color: "#d9534f", fontWeight: "600" }}>📌  Note:-</code> If this link does not open, navigate via
              <strong> Codeforces → EDU → Courses → ITMO Academy: Pilot Course → Segment Tree, Part 1</strong>
            </span>

          </li>
        </ul>

        <p className="st-text">
          These resources will provide you with a deeper understanding of
          Segment Trees and their applications in competitive programming and
          algorithm design.
        </p>

        <h1 className="st-title">Summary</h1>
        <p className="st-text">
          I have explained Segment Trees based on my <strong> own understanding </strong> and what
          I learned while studying them. I hope this guide is helpful to you. If
          you notice any mistakes or areas for improvement, please feel free to
          report them.
        </p>

        <div className="about-footer">
          © {new Date().getFullYear()} Yogesh Saini · All rights reserved
        </div>
      </div>
    </div>
  );
}
