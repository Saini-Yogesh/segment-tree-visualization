"use client";

import { useState } from "react";
import { FaBug } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import "../../styles/ReportBugButton.css";

export default function ReportBugButton() {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    const handleReportBug = () => {
        window.open("https://forms.gle/nt6ak9btDiEXUa3L9", "_blank");
    };

    const handleClose = (e) => {
        e.stopPropagation(); // prevent opening report link
        setVisible(false);
    };

    return (
        <button
            className="report-bug-btn"
            onClick={handleReportBug}
            aria-label="Report a bug"
        >
            <span className="report-bug-close" onClick={handleClose}>
                <IoClose />
            </span>

            <FaBug className="report-bug-icon" />

            <span className="report-bug-text">Report Bug</span>
        </button>
    );
}
