"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./styles/Footer.css";

export default function Footer() {
  const pathname = usePathname();
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // Hide the global footer on the interactive visualizer home page
  if (pathname === "/") {
    return null;
  }

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Simplified Links row */}
        <div className="footer-links">
          <Link href="/segment-tree">Tutorial</Link>
          <span className="footer-dot">•</span>
          <Link href="/lazy-propagation-in-segment-tree">Lazy Propagation</Link>
          <span className="footer-dot">•</span>
          <Link href="/segment-tree-time-complexity">Complexity</Link>
          <span className="footer-dot">•</span>
          <Link href="/segment-tree-vs-fenwick-tree">Segment vs BIT</Link>
          <span className="footer-dot">•</span>
          <Link href="/segment-tree-interview-questions">Practice</Link>
          <span className="footer-dot">•</span>
          <a
            href="https://github.com/Saini-Yogesh/segment-tree-visualization"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>

        {/* Simplified copyright row */}
        <div className="footer-bottom-bar">
          <div>
            © {currentYear} Yogesh Saini. All rights reserved.
          </div>
          <div>
            Developed by{" "}
            <a
              href="https://saini-yogesh.github.io/Portfolio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Yogesh Saini
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
