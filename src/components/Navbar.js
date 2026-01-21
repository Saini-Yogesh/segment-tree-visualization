"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./styles/Navbar.css";

export default function TopTabs() {
    const pathname = usePathname();

    return (
        <div className="top-tabs">
            <Link
                href="/segment-tree"
                className={pathname === "/segment-tree" ? "active" : ""}
            >
                Segment Tree
            </Link>

            <Link
                href="/lazy-propagation-in-segment-tree"
                className={pathname === "/lazy-propagation-in-segment-tree" ? "active" : ""}
            >
                Lazy Propagation
            </Link>

            <Link
                href="/"
                className={pathname === "/" ? "active" : ""}
            >
                SGT Visualizer
            </Link>

            <Link
                href="/about"
                className={pathname === "/about" ? "active" : ""}
            >
                About
            </Link>
        </div>
    );
}
