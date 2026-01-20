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
                href="/lazy-segment-tree"
                className={pathname === "/lazy-segment-tree" ? "active" : ""}
            >
                Lazy Segment Tree
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
                About me
            </Link>
        </div>
    );
}
