import { Geist, Geist_Mono } from "next/font/google";
import "../components/styles/globals.css";
import Navbar from "../components/Navbar";

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
  title: "Segment Tree Visualizer | Interactive DSA Tool for Range Queries",
  description:
    "Master Segment Trees with our interactive visualizer! Learn how to efficiently perform Range Minimum, Maximum, and Sum Queries with real-time animations.",
  keywords:
    "Segment Tree, Data Structures, DSA, Range Queries, Range Minimum Query, Range Maximum Query, Range Sum Query, Lazy Propagation, Algorithm Visualization, Interactive Learning",
  openGraph: {
    title: "Segment Tree Visualizer | Master Range Queries",
    description:
      "Explore and understand Segment Trees with an interactive visualizer. Perform Range Min, Max, and Sum Queries in real time with smooth animations.",
    url: "https://segment-tree-visualization.vercel.app/",
    siteName: "Segment Tree Visualizer",
    type: "website",
    images: [
      {
        url: "https://images.tpointtech.com/ds/images/binary-tree.png", // Ensure absolute URL
        secure_url: "https://images.tpointtech.com/ds/images/binary-tree.png", // Ensure secure access
        width: 1200,
        height: 630,
        alt: "Segment Tree Visualization - Interactive Learning",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Segment Tree Visualizer | Learn & Optimize",
    description:
      "Understand and visualize Segment Tree operations! Run real-time range queries and updates with an interactive interface.",
    images: ["https://images.tpointtech.com/ds/images/binary-tree.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Segment Tree Visualizer",
              description:
                "An interactive tool for learning and visualizing Segment Tree operations like Range Min/Max/Sum Queries.",
              applicationCategory: "Educational",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              url: "https://segment-tree-visualization.vercel.app/",
              image: "https://images.tpointtech.com/ds/images/binary-tree.png",
              author: {
                "@type": "Person",
                name: "Yogesh Saini",
              },
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
