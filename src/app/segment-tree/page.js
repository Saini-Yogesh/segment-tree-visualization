'use client'

import './SegmentTree.css'

export default function SegmentTreePage() {
  return (
    <section className="st">
      <div className="st-container">
        <h1 className="st-title">Segment Tree</h1>
        <p className="st-subtitle">
          A powerful data structure for efficient range queries
        </p>

        {/* INTRO */}
        <div className="st-section">
          <h2>What is a Segment Tree?</h2>
          <p>
            A Segment Tree is a binary tree-based data structure used to
            efficiently process range queries and point updates on an array.
            It reduces query time from <b>O(n)</b> to <b>O(log n)</b>.
          </p>
        </div>

        {/* WHY */}
        <div className="st-section">
          <h2>Why Do We Need Segment Trees?</h2>
          <ul>
            <li>Fast range queries (sum, min, max, gcd)</li>
            <li>Efficient updates</li>
            <li>Works well with large datasets</li>
          </ul>
        </div>

        {/* STRUCTURE */}
        <div className="st-section">
          <h2>Structure of a Segment Tree</h2>
          <p>
            Each node represents a segment (range) of the array.
            The root represents the full range, and each internal node
            splits the range into two halves.
          </p>
        </div>

        {/* OPERATIONS */}
        <div className="st-section">
          <h2>Operations</h2>
          <ul>
            <li><b>Build</b>: O(n)</li>
            <li><b>Query</b>: O(log n)</li>
            <li><b>Update</b>: O(log n)</li>
          </ul>
        </div>

        {/* USE CASES */}
        <div className="st-section">
          <h2>Common Use Cases</h2>
          <ul>
            <li>Range sum queries</li>
            <li>Minimum / Maximum queries</li>
            <li>Competitive programming</li>
            <li>Time-series data analysis</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="st-cta">
          <a href="/">← Back to Home</a>
          <a href="/about">About Me →</a>
        </div>
      </div>
    </section>
  )
}
