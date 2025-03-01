import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  title: "Segment Tree Visualizer | Interactive Range Query Demo",
  description:
    "Visualize Segment Tree operations like Range Min, Max, and Sum Queries in real time. Learn how to optimize range updates efficiently with our interactive visualizer.",
  keywords:
    "Segment Tree, ST, Range Min Query, Range Max Query, Range Sum Query, RMQ, RSQ, Segment Tree Visualization, Data Structures, DSA Visualizer",
  openGraph: {
    title: "Segment Tree Visualizer | Learn and Optimize",
    description:
      "Explore how Segment Trees work! Visualize Range Min/Max/Sum Queries and optimize range updates interactively.",
    url: "https://yourwebsite.com/segment-tree-visualizer",
    siteName: "Segment Tree Visualizer",
    type: "website",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "Segment Tree Visualization Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Segment Tree Visualizer",
    description:
      "Learn and interact with Segment Tree operations! Visualize queries and updates in real-time.",
    images: ["/preview.jpg"],
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
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
