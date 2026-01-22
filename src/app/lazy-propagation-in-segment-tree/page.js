'use client';

import Link from 'next/link';
import { AllCodes } from "./AllCodes.js";
import HighlightedCode from "../../components/functions/HighlightedCode/HighlightedCode";
import '@/components/styles/CommonSegmentTree.css'

export default function SegmentTreeLazyPage() {
    return (
        <section className="st">
            <div className="st-container">
                {/* TITLE */}
                <h1 className="st-title">Lazy Propagation in Segment Tree</h1>

                {/* NOTE */}
                <div className="st-highlight">
                    <p className="st-text">
                        Note: This section assumes that you already understand the basics of
                        Segment Trees. If not, please read the Segment Tree explanation
                        first and then come back here.
                    </p>
                    <p className="st-text">
                        👉 <Link href="/segment-tree">Go to Segment Tree</Link>
                    </p>
                </div>

                {/* WHAT IS LAZY PROPAGATION */}
                <h2 className="st-heading">What is Lazy Propagation?</h2>
                <p className="st-text">
                    Lazy Propagation is an optimization technique used in Segment Trees to
                    efficiently handle <strong>range update operations</strong>. Instead
                    of updating all elements in a range immediately, updates are delayed
                    and applied only when required.
                </p>

                {/* WHEN IT IS USED */}
                <h2 className="st-heading">When is Lazy Propagation Used?</h2>
                <p className="st-text">
                    Lazy Propagation is mainly used when we need to perform{" "}
                    <strong>range-based updates</strong>. For example:
                </p>

                <ul className="st-list">
                    <li>Adding a value to all elements in a range <code className="st-inline-code">[ql, qr]</code></li>
                    <li>Assigning a value to all elements in a range</li>
                    <li>Updating ranges multiple times before querying</li>
                </ul>

                <p className="st-highlight">
                    Without lazy propagation, these operations would require updating
                    every element in the range, leading to poor performance.
                </p>

                {/* HOW IT WORKS */}
                <h2 className="st-heading">How Does Lazy Propagation Work?</h2>
                <p className="st-text">
                    As the name suggests, lazy propagation works by{" "}
                    <strong>postponing updates</strong>. When a range update is applied,
                    the Segment Tree node stores the update value in a separate{" "}
                    <code className="st-inline-code">lazy</code> array instead of
                    immediately updating its children.
                </p>

                <p className="st-text">
                    For example, if we need to add <code className="st-inline-code">7</code>{" "}
                    to the range <code className="st-inline-code">[5, 8]</code>, the node
                    covering this range will store:
                </p>

                <div className="st-highlight">
                    <p className="st-text">
                        <code className="st-inline-code">lazy[idx] = 7</code>
                    </p>
                    <p className="st-text">
                        The actual update is applied only when this segment is required
                        during a query or further traversal.
                    </p>
                </div>

                <p className="st-text">
                    This avoids unnecessary updates and ensures that operations remain
                    efficient.
                </p>

                {/* PREFIX SUM PROBLEM */}
                <h2 className="st-heading">Why Prefix Sum Fails for Range Updates</h2>
                <p className="st-text">
                    Using a prefix sum array, we can answer range sum queries in{" "}
                    <code className="st-inline-code">O(1)</code> time. However, when an
                    update occurs:
                </p>

                <ul className="st-list">
                    <li>The original array changes</li>
                    <li>The prefix sum array must be rebuilt</li>
                    <li>This rebuild takes <code className="st-inline-code">O(n)</code> time</li>
                </ul>

                <p className="st-text">
                    With many updates, the total time complexity becomes{" "}
                    <code className="st-inline-code">O(q · n)</code>, which leads to{" "}
                    <strong>TLE</strong> for large inputs.
                </p>

                {/* HOW SEGMENT TREE SOLVES */}
                <h2 className="st-heading">How Segment Tree with Lazy Propagation Solves This</h2>
                <p className="st-text">
                    A Segment Tree with Lazy Propagation solves this problem efficiently
                    by:
                </p>

                <ul className="st-list">
                    <li>Answering range queries in <code className="st-inline-code">O(log n)</code></li>
                    <li>Handling range updates in <code className="st-inline-code">O(log n)</code></li>
                </ul>

                <p className="st-text">
                    Even with a large number of queries, the total time complexity becomes{" "}
                    <code className="st-inline-code">O(q · log n)</code>, which is efficient
                    and scalable.
                </p>

                {/* CONCLUSION */}
                <h2 className="st-heading">Conclusion</h2>
                <ul className="st-list">
                    <li>Prefix sums fail when frequent updates are required</li>
                    <li>Segment Trees handle both queries and updates efficiently</li>
                    <li>
                        Lazy Propagation is a reliable and scalable solution that optimizes
                        range-based update operations
                    </li>
                </ul>

                <p className="st-highlight">
                    Lazy propagation turns expensive range updates into efficient operations,
                    making segment trees practical for real competitive programming problems.
                </p>

                <h1 className="st-title">Structure of Lazy Propagation</h1>

                <p className="st-text">
                    Lazy Propagation is an extension of the Segment Tree that is used when
                    <strong> range-based update operations</strong> are required. The core
                    structure of the Segment Tree remains the same; lazy propagation only
                    changes how and when updates are applied.
                </p>

                <h2 className="st-heading">Lazy Array</h2>
                <p className="st-text">
                    Along with the segment tree array, an additional array called the
                    <code className="st-inline-code">lazy</code> array is maintained. This
                    array stores pending updates for segments that have not yet been
                    propagated to their child nodes.
                </p>

                <p className="st-text">
                    When a range update completely covers a segment, the update is applied
                    to the current node, and the update value is stored in the
                    <code className="st-inline-code">lazy</code> array. The children are not
                    updated immediately.
                </p>

                <h2 className="st-heading">Deferred Updates</h2>
                <p className="st-text">
                    Updates are intentionally delayed. A segment is only updated when it
                    is required during a query or when further traversal of that segment
                    is necessary. This avoids repeated updates on large ranges.
                </p>

                <div className="st-highlight">
                    <p className="st-text">
                        Lazy propagation postpones updates until they are actually needed,
                        while still keeping the segment tree logically correct.
                    </p>
                </div>

                <h2 className="st-heading">Propagation Process</h2>
                <p className="st-text">
                    Whenever a node is accessed, any pending lazy value stored at that
                    node is first applied. The value is then passed to its children, and
                    the lazy value of the current node is cleared.
                </p>

                <p className="st-text">
                    This ensures correctness while maintaining logarithmic time
                    complexity.
                </p>

                <h2 className="st-heading">Construction</h2>
                <p className="st-text">
                    The construction of a Segment Tree with Lazy Propagation is identical
                    to a normal Segment Tree. The tree is built using a merge operation,
                    and the lazy array is initialized with zeros.
                </p>

                <h2 className="st-heading">Time Complexity</h2>
                <ul className="st-list">
                    <li>Building the tree: <code className="st-inline-code">O(n)</code></li>
                    <li>Range update: <code className="st-inline-code">O(log n)</code></li>
                    <li>Point update: <code className="st-inline-code">O(log n)</code></li>
                    <li>Range query: <code className="st-inline-code">O(log n)</code></li>
                </ul>

                <p className="st-text">
                    By deferring updates and applying them only when necessary, Lazy
                    Propagation allows Segment Trees to efficiently handle large numbers
                    of range updates and queries.
                </p>

                <h1 className="st-title">Range Sum, Point Update, and Range Update Queries</h1>

                {/* SUM QUERIES */}
                <h2 className="st-heading">Range Sum Queries</h2>
                <p className="st-text">
                    In a Segment Tree with Lazy Propagation, sum queries are handled
                    similarly to a normal Segment Tree, with one additional step to ensure
                    correctness.
                </p>

                <ul className="st-list">
                    <li>
                        Before using a node’s value, any pending lazy update stored at that
                        node is applied.
                    </li>
                    <li>
                        If the current segment completely lies inside the query range
                        <code className="st-inline-code">[ql, qr]</code>, its stored sum is
                        returned directly.
                    </li>
                    <li>
                        If the query range lies entirely in one child, the query is
                        forwarded to that child.
                    </li>
                    <li>
                        If the query overlaps both children, the range is split, both
                        children are queried recursively, and their results are added.
                    </li>
                </ul>

                <p className="st-highlight">
                    Since lazy updates are applied only when required and the height of
                    the tree is <code className="st-inline-code">O(log n)</code>, the time
                    complexity of a sum query remains{" "}
                    <code className="st-inline-code">O(log n)</code>.
                </p>

                {/* POINT UPDATE */}
                <h2 className="st-heading">Point Update Queries</h2>
                <p className="st-text">
                    A point update modifies a single element in the array. The process is
                    similar to a normal Segment Tree update, with the additional handling
                    of lazy values.
                </p>

                <ul className="st-list">
                    <li>
                        Any pending lazy value at the current node is first applied before
                        moving deeper.
                    </li>
                    <li>
                        The tree is recursively traversed to reach the leaf node
                        corresponding to the update index.
                    </li>
                    <li>
                        After updating the leaf node, the changes are propagated upward by
                        recomputing the affected parent nodes.
                    </li>
                </ul>

                <p className="st-highlight">
                    Only one node per level is updated, so the time complexity of a point
                    update is also{" "}
                    <code className="st-inline-code">O(log n)</code>.
                </p>

                {/* RANGE UPDATE */}
                <h2 className="st-heading">Range Update Queries</h2>
                <p className="st-text">
                    Range update queries are the main reason for using Lazy Propagation.
                    Instead of updating every element in the range immediately, updates
                    are deferred.
                </p>

                <ul className="st-list">
                    <li>
                        If the current segment lies completely outside the update range, it
                        is ignored.
                    </li>
                    <li>
                        If the current segment is fully covered by the update range, the
                        node is updated directly and the update value is stored in the
                        <code className="st-inline-code">lazy</code> array.
                    </li>
                    <li>
                        If the segment is partially covered, any pending lazy updates are
                        first propagated, and the update is applied recursively to both
                        children.
                    </li>
                </ul>

                <p className="st-text">
                    By postponing updates and applying them only when necessary, range
                    updates are performed in{" "}
                    <code className="st-inline-code">O(log n)</code> time instead of
                    linear time.
                </p>

                <p className="st-highlight">
                    This combination of efficient sum queries, point updates, and range
                    updates makes Lazy Propagation essential for handling complex
                    range-based problems efficiently.
                </p>

                <h1 className="st-title">Implementation</h1>

                <p className="st-text">
                    There are multiple ways to implement a Segment Tree with Lazy
                    Propagation. A commonly used and efficient approach is the
                    <strong> array-based representation</strong>, where the tree is stored
                    in a flat array. This approach is both time-efficient and
                    space-efficient.
                </p>

                <p className="st-text">
                    If you want to understand why an array is used to represent a Segment
                    Tree, you can refer to the explanation provided on{" "}
                    <a
                        href="https://cp-algorithms.com/data_structures/segment_tree.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        CP-Algorithms
                    </a>
                    .
                </p>

                <h2 className="st-heading">Array-Based Representation</h2>
                <p className="st-text">
                    The array-based representation for Lazy Propagation is the same as a
                    normal Segment Tree. The only difference is the addition of a separate
                    <code className="st-inline-code">lazy</code> array to store pending
                    updates.
                </p>

                <p className="st-text">
                    In this representation, the Segment Tree is stored in an array of size
                    <code className="st-inline-code">4 * n</code> to safely accommodate all
                    nodes.
                </p>

                <ul className="st-list">
                    <li>The root node is stored at index <code className="st-inline-code">0</code></li>
                    <li>The left child of a node at index <code className="st-inline-code">i</code> is at <code className="st-inline-code">2 * i + 1</code></li>
                    <li>The right child of a node at index <code className="st-inline-code">i</code> is at <code className="st-inline-code">2 * i + 2</code></li>
                </ul>

                <p className="st-text">
                    This representation allows efficient traversal and updates without
                    using explicit pointers.
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
                        <code className="st-inline-code">ql</code> → left boundary of the query or
                        range update
                    </li>
                    <li>
                        <code className="st-inline-code">qr</code> → right boundary of the query or
                        range update
                    </li>
                    <li>
                        <code className="st-inline-code">pos</code> → index of the element for a point
                        update
                    </li>
                    <li>
                        <code className="st-inline-code">val</code> → value to be added during a point
                        or range update
                    </li>
                </ul>

                <h2 className="st-heading">Build Function</h2>
                <HighlightedCode code={AllCodes.buildCode} />

                <p className="st-text">
                    The <code className='st-inline-code'>build</code> function constructs the Segment Tree in the same way as a
                    normal Segment Tree. Leaf nodes store individual array elements, and
                    internal nodes store the merged result of their children. The
                    <code className="st-inline-code">lazy</code> array is initialized with
                    zeros.
                </p>

                <h2 className="st-heading">Push Function</h2>
                <HighlightedCode code={AllCodes.lazyPushCode} />

                <p className="st-text">
                    The <code className="st-inline-code">push</code> function is used to propagate
                    pending lazy values from a parent node to its children. When a node has a
                    non-zero lazy value and we need to access its children (during a query or
                    further update), this value is pushed down to the child nodes.
                </p>

                <p className="st-text">
                    During the <code className="st-inline-code">push</code> operation, a pending
                    update stored at a node is propagated to its children. If a node representing
                    the range <code className="st-inline-code">[l, r]</code> has a lazy value
                    <code className="st-inline-code">lazy[idx] = x</code>, then this value is passed
                    down to both child nodes. The left child and right child each accumulate this
                    value in their own <code className="st-inline-code">lazy</code> entries, and
                    their segment values are updated accordingly.
                </p>

                <p className="st-text">
                    For example, if a node covering the range
                    <code className="st-inline-code">[2, 5]</code> has a pending update of
                    <code className="st-inline-code">+3</code>, this update is not immediately
                    applied to its children. When a push is required, the update is transferred to
                    the children covering <code className="st-inline-code">[2, 3]</code> and
                    <code className="st-inline-code">[4, 5]</code>. Each child stores the update in
                    its lazy value, and the parent’s lazy value is then reset.
                </p>

                <div className="st-highlight">
                    <p className="st-text">
                        The push function ensures correctness by applying deferred updates at the
                        right time, while still keeping all operations efficient with
                        <code className="st-inline-code">O(log n)</code> complexity.
                    </p>
                </div>

                <h2 className="st-heading">Range Sum Query Function</h2>
                <HighlightedCode code={AllCodes.rangeSumQueryCode} />

                <p className="st-text">
                    Range sum queries in a Lazy Segment Tree are conceptually similar to those in a
                    normal Segment Tree, but with an important additional step. In a standard
                    Segment Tree, we can directly use the stored node values because there are no
                    pending updates.
                </p>

                <p className="st-text">
                    In contrast, a Lazy Segment Tree may contain pending updates stored in the
                    <code className="st-inline-code">lazy</code> array. Therefore, before using the
                    value of any node, we must first check whether a lazy value exists. If a
                    pending update is found, it is propagated to the child nodes using the
                    <code className="st-inline-code">push</code> function, and the current node’s
                    value is updated accordingly.
                </p>

                <p className="st-text">
                    After ensuring that all pending updates are applied, the query proceeds using
                    the same overlap-based logic as a normal Segment Tree to compute the required
                    range sum.
                </p>

                <h2 className="st-heading">Point Update Function</h2>
                <HighlightedCode code={AllCodes.pointUpdateCode} />

                <p className="st-text">
                    In a Lazy Segment Tree, a point update follows the same traversal path as in a
                    normal Segment Tree, but with additional handling for pending updates. Starting
                    from the root, the tree is traversed recursively toward the leaf node that
                    represents the target index.
                </p>

                <p className="st-text">
                    At each visited node, the algorithm first checks whether there is any pending
                    update stored in the <code className="st-inline-code">lazy</code> array. If a
                    lazy value exists, it is propagated downward using the
                    <code className="st-inline-code">push</code> function so that the current node
                    and its children reflect all deferred updates before continuing the traversal.
                </p>

                <p className="st-text">
                    Once the traversal reaches the leaf node corresponding to the update index,
                    the node’s value is updated directly. As the recursion unwinds, all ancestor
                    nodes are recomputed using the merge operation (such as summation), ensuring
                    that the changes are correctly reflected throughout the tree.
                </p>

                <h2 className="st-heading">Range Update Function</h2>
                <HighlightedCode code={AllCodes.rangeUpdateCode} />

                <p className="st-text">
                    The range update function is the core component of a Lazy Segment Tree. Its
                    purpose is to apply an update operation (such as addition or assignment) to
                    all elements within a given range
                    <code className="st-inline-code">[ql, qr]</code> without explicitly updating
                    every element in that range.
                </p>

                <p className="st-text">
                    When the current segment
                    <code className="st-inline-code">[l, r]</code> is completely outside the
                    update range, the function returns immediately, as no update is required.
                    If the segment is fully covered by the update range, the update is applied
                    directly to the node’s stored value, and the update information is recorded
                    in the <code className="st-inline-code">lazy</code> array. This indicates that
                    the update should be propagated to the children at a later time.
                </p>

                <p className="st-text">
                    In the case of partial overlap, the algorithm first checks for any pending
                    lazy updates at the current node. If such updates exist, they are propagated
                    downward using the <code className="st-inline-code">push</code> function to
                    ensure correctness. The update operation is then recursively applied to both
                    child segments, and after the recursion completes, the current node’s value
                    is recomputed using the merge operation.
                </p>

                <div className="st-highlight">
                    <p className="st-text">
                        By deferring updates and propagating them only when necessary, the range
                        update function guarantees that both update and query operations run in
                        <code className="st-inline-code">O(log n)</code> time, even for large input
                        sizes.
                    </p>
                </div>

                <div className="st-highlight">
                    <p className="st-text">
                        <strong style={{ color: "red" }}>📌 Note:</strong> A point update is a special case of a range update
                        where the update range consists of a single index. In other words, when the
                        start and end of the update range are equal, both operations behave
                        identically.
                    </p>

                    <p className="st-text">
                        From an implementation perspective, this can be expressed as:
                    </p>

                    <p className="st-text">
                        <code className="st-inline-code">
                            pointUpdate(idx, l, r, pos, val)
                        </code>
                        <br />
                        is equivalent to
                        <br />
                        <code className="st-inline-code">
                            rangeUpdate(idx, l, r, pos, pos, val)
                        </code>
                    </p>

                    <p className="st-text">
                        This equivalence highlights that Lazy Propagation generalizes point updates
                        into range updates, allowing both operations to be handled efficiently
                        within a unified framework.
                    </p>
                </div>

                <h2 className="st-title">Complete Segment Tree Code</h2>
                <p className="st-text">
                    Here is a sample code snippet for Segment Tree with lazy propagation sum operations:
                </p>
                <HighlightedCode code={AllCodes.completeCode} />

                {/* PRACTICE PROBLEMS */}
                <h2 className="st-title">Practice Problems</h2>
                <p className="st-text">
                    You can practice Lazy Propagation–based Segment Tree problems on various
                    competitive programming platforms. Here are a few recommended problems to get you started:
                </p>

                <ul className="st-list">
                    <li>
                        <a
                            href="https://cses.fi/problemset/task/1735"
                            target="_blank"
                            rel="noreferrer"
                        >
                            CSES – Range Updates and Sums
                        </a>
                    </li>

                    <li>
                        <a
                            href="https://codeforces.com/problemset/problem/242/E"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Codeforces – XOR on Segment (242E)
                        </a>
                    </li>

                    <li>
                        <a
                            href="https://codeforces.com/problemset/problem/438/D"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Codeforces – Segment Tree and Queries (438D)
                        </a>
                    </li>

                    <li>
                        <a
                            href="https://codeforces.com/problemset/problem/52/C"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Codeforces – Circular RMQ (52C)
                        </a>
                    </li>

                    <li>
                        <a
                            href="https://codeforces.com/problemset/problem/1179/E"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Codeforces – Count Segments (1179E)
                        </a>
                    </li>
                </ul>


                <p className="st-text">
                    These problems will help you understand the implementation and
                    application of Segment Trees with Lazy Propagation in different scenarios.
                </p>

                {/* FURTHER READING */}
                <h2 className="st-title">Further Reading</h2>
                <p className="st-text">
                    For a deeper understanding of Segment Trees, consider exploring the
                    following resources:
                </p>

                <ul className="st-list">
                    <li>
                        <a
                            href="https://cp-algorithms.com/data_structures/segment_tree.html#range-updates-lazy-propagation"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            CP-Algorithms: Lazy Propagation in Segment Tree
                        </a>{" "}
                        – A comprehensive guide covering range updates, lazy propagation mechanics,
                        and efficient query handling.
                    </li>

                    <li>
                        <a
                            href="https://www.geeksforgeeks.org/dsa/lazy-propagation-in-segment-tree/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GeeksforGeeks: Lazy Propagation in Segment Tree
                        </a>{" "}
                        – Explains the concept of lazy propagation, including range updates and
                        deferred propagation techniques.
                    </li>

                    <li>
                        <a
                            href="https://codeforces.com/edu/course/2/lesson/5/1/practice"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Codeforces: Segment Tree – Part 2
                        </a>{" "}
                        – Focuses on lazy propagation and advanced segment tree update strategies.
                        <br />
                        <span className="st-muted" style={{ display: "block", marginTop: "6px" }}>
                            <code style={{ color: "#d9534f", fontWeight: "600" }}>📌  Note:-</code> If this link does not open, navigate via
                            <strong> Codeforces → EDU → Courses → ITMO Academy: Pilot Course → Segment Tree, Part 2</strong>
                        </span>
                    </li>
                </ul>

                <p className="st-text">
                    These resources explain lazy propagation in detail and show how it is used to
                    solve complex range update problems in competitive programming.
                </p>


                {/* SUMMARY */}
                <h2 className="st-title">Summary</h2>
                <p className="st-text">
                    I have explained Segment Tree with Lazy Propagation based on my <strong>own understanding</strong> and what I
                    learned while studying them. I hope this guide is helpful. If you find
                    any mistakes or areas for improvement, please feel free to report them.
                </p>

                <p className="about-footer">
                    © 2026 Yogesh Saini · All rights reserved
                </p>

            </div>
        </section>
    );
}
