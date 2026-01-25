import { Geist, Geist_Mono } from "next/font/google";
import "../components/styles/globals.css";
import Navbar from "../components/Navbar";
import ScrollToTopButton from "../components/functions/ScrollToTopButton/ScrollToTopButton";
import ReportBugButton from "@/components/functions/ReportBugButton/ReportBugButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://segment-tree-visualization.vercel.app/"),

  title:
    "Segment Tree Visualizer | Range Queries, Range Updates & Lazy Propagation Animation",

  description:
    "Interactive Segment Tree Visualizer to learn range sum, range min/max queries, point updates, and range updates using lazy propagation with step-by-step animations. Ideal for DSA, competitive programming, and interview preparation.",

  keywords: [
    // Core
    "segment tree",
    "segment tree visualizer",
    "segment tree animation",
    "segment tree tutorial",

    // Queries
    "range sum query segment tree",
    "range minimum query",
    "range maximum query",
    "segment tree range query",

    // Updates
    "segment tree point update",
    "segment tree range update",
    "range update segment tree",

    // Lazy Propagation
    "lazy propagation",
    "lazy propagation segment tree",
    "range update lazy propagation",
    "segment tree lazy propagation animation",

    // Audience / Intent
    "data structures visualization",
    "algorithm visualization",
    "competitive programming segment tree",
    "segment tree dsa",
    "segment tree interview questions",
  ],

  openGraph: {
    title:
      "Segment Tree Visualizer | Range Updates & Lazy Propagation with Animation",
    description:
      "Visualize Segment Tree operations including range queries, point updates, and range updates using lazy propagation. Learn with interactive animations designed for competitive programming.",
    url: "https://segment-tree-visualization.vercel.app/",
    siteName: "Segment Tree Visualizer",
    type: "website",
    images: [
      {
        url: "https://segment-tree-visualization.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt:
          "Segment Tree Visualizer with Range Updates and Lazy Propagation Animation",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Segment Tree Visualizer | Range Update & Lazy Propagation Animation",
    description:
      "Learn Segment Tree with interactive animations for range queries, point updates, and lazy propagation. Built for DSA and competitive programming.",
    images: [
      "https://segment-tree-visualization.vercel.app/og-image.png",
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="MOAumdSax3koXw9eLHBo9_MtJ0xLb3YpGZQubfnHKc0" />
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Segment Tree Visualizer",
              description:
                "An interactive educational tool to visualize Segment Tree operations including range queries, point updates, and range updates using lazy propagation with animations.",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Web",
              url: "https://segment-tree-visualization.vercel.app/",
              image:
                "https://segment-tree-visualization.vercel.app/og-image.png",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Person",
                name: "Yogesh Saini",
              },
              keywords:
                "segment tree, range update, lazy propagation, segment tree animation, data structures, competitive programming",
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        {children}
        <div className="floating-actions">
          <ScrollToTopButton />
          <ReportBugButton />
        </div>
      </body>
    </html>
  );
}
