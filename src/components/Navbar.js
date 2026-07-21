"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./styles/Navbar.css";

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Group paths for the "More" dropdown
    const groupPaths = [
        "/segment-tree-time-complexity",
        "/segment-tree-vs-fenwick-tree",
        "/segment-tree-interview-questions",
        "/about"
    ];

    // Check if the current route is one of the grouped pages
    const isGroupActive = groupPaths.includes(pathname);

    return (
        <div className="navbar-wrapper">
            <div className="navbar-container">
                {/* Logo section on the left */}
                <div className="nav-logo">
                    <Link href="/" onClick={() => setIsOpen(false)}>
                        <span className="logo-text">SGT Visualizer</span>
                    </Link>
                </div>

                {/* 4 items on the right */}
                <div className="nav-links">
                    {/* Item 1: Tool */}
                    <Link
                        href="/"
                        className={pathname === "/" ? "active" : ""}
                        onClick={() => setIsOpen(false)}
                    >
                        Tool
                    </Link>

                    {/* Item 2: Segment Tree (Hidden on mobile header, shown inside dropdown) */}
                    <Link
                        href="/segment-tree"
                        className={`hide-on-mobile ${pathname === "/segment-tree" ? "active" : ""}`}
                        onClick={() => setIsOpen(false)}
                    >
                        Segment Tree
                    </Link>

                    {/* Item 3: Lazy (Hidden on mobile header, shown inside dropdown) */}
                    <Link
                        href="/lazy-propagation-in-segment-tree"
                        className={`hide-on-mobile ${pathname === "/lazy-propagation-in-segment-tree" ? "active" : ""}`}
                        onClick={() => setIsOpen(false)}
                    >
                        Lazy Propagation
                    </Link>

                    {/* Item 4: Group All (More) */}
                    <div 
                        className="nav-dropdown"
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                    >
                        <span 
                            className={`dropdown-trigger ${isGroupActive ? "active" : ""}`}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            More <span className="arrow">▼</span>
                        </span>
                        {isOpen && (
                            <div className="dropdown-menu">
                                {/* Mobile-only dropdown duplicates */}
                                <Link
                                    href="/segment-tree"
                                    className={`show-only-on-mobile ${pathname === "/segment-tree" ? "active" : ""}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    Segment Tree Basics
                                </Link>
                                <Link
                                    href="/lazy-propagation-in-segment-tree"
                                    className={`show-only-on-mobile ${pathname === "/lazy-propagation-in-segment-tree" ? "active" : ""}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    Lazy Propagation
                                </Link>

                                {/* Shared dropdown items */}
                                <Link
                                    href="/segment-tree-time-complexity"
                                    className={pathname === "/segment-tree-time-complexity" ? "active" : ""}
                                    onClick={() => setIsOpen(false)}
                                >
                                    Time & Space Complexity
                                </Link>
                                <Link
                                    href="/segment-tree-vs-fenwick-tree"
                                    className={pathname === "/segment-tree-vs-fenwick-tree" ? "active" : ""}
                                    onClick={() => setIsOpen(false)}
                                >
                                    Segment Tree vs BIT
                                </Link>
                                <Link
                                    href="/segment-tree-interview-questions"
                                    className={pathname === "/segment-tree-interview-questions" ? "active" : ""}
                                    onClick={() => setIsOpen(false)}
                                >
                                    Interview Questions
                                </Link>
                                <Link
                                    href="/about"
                                    className={pathname === "/about" ? "active" : ""}
                                    onClick={() => setIsOpen(false)}
                                >
                                    About Creator
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
