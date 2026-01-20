'use client'

import './SegmentTreeLazy.css'

export default function SegmentTreeLazyPage() {
    return (
        <section className="stl">
            <div className="stl-container">
                <h1 className="stl-title">Segment Tree with Lazy Propagation</h1>
                <p className="stl-subtitle">
                    Efficient range updates and range queries
                </p>

                <div className="stl-section">
                    <h2>What is Lazy Propagation?</h2>
                    <p>
                        Lazy Propagation is an optimization technique used with Segment Trees
                        to handle range updates efficiently. Instead of updating all elements
                        in a range immediately, updates are postponed and applied only when
                        necessary.
                    </p>
                </div>

                <div className="stl-section">
                    <h2>Why Do We Need It?</h2>
                    <ul>
                        <li>Naive range updates take O(n)</li>
                        <li>Lazy propagation reduces it to O(log n)</li>
                        <li>Essential for large inputs</li>
                    </ul>
                </div>

                <div className="stl-section">
                    <h2>How It Works</h2>
                    <p>
                        Each node stores a <b>lazy value</b> representing pending updates.
                        When a node is accessed, the update is propagated to its children
                        before further operations.
                    </p>
                </div>

                <div className="stl-section">
                    <h2>Time Complexity</h2>
                    <ul>
                        <li><b>Build:</b> O(n)</li>
                        <li><b>Range Update:</b> O(log n)</li>
                        <li><b>Range Query:</b> O(log n)</li>
                    </ul>
                </div>

                <div className="stl-section">
                    <h2>Use Cases</h2>
                    <ul>
                        <li>Range sum / min / max updates</li>
                        <li>Competitive programming</li>
                        <li>Large-scale data processing</li>
                    </ul>
                </div>

                <div className="stl-cta">
                    <a href="/segment-tree">← Segment Tree</a>
                    <a href="/">Home →</a>
                </div>
            </div>
        </section>
    )
}
