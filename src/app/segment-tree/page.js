import SegmentTreeContent from "./SegmentTreeContent";

export const metadata = {
  title: "Segment Tree Guide: Construction, Queries & Updates",
  description: "Comprehensive guide to Segment Trees. Learn range sum/min/max queries, O(N) build algorithms, and O(log N) point updates with C++ code examples.",
  alternates: {
    canonical: "/segment-tree",
  },
  keywords: [
    "what is a segment tree",
    "segment tree data structure",
    "segment tree c++",
    "build segment tree",
    "segment tree query",
    "segment tree range sum",
    "point update segment tree",
    "dsa tutorial segment tree"
  ],
  openGraph: {
    title: "Segment Tree Guide: Construction, Queries & Updates",
    description: "Comprehensive guide to Segment Trees. Learn range sum/min/max queries, O(N) build algorithms, and O(log N) point updates with C++ code examples.",
    url: "https://segment-tree-visualization.vercel.app/segment-tree",
  },
  twitter: {
    title: "Segment Tree Guide: Construction, Queries & Updates",
    description: "Comprehensive guide to Segment Trees. Learn range sum/min/max queries, O(N) build algorithms, and O(log N) point updates with C++ code examples.",
  }
};

export default function SegmentTreePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a Segment Tree?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Segment Tree is a tree-based data structure used to efficiently handle range-based queries (such as range sum, minimum, or maximum) on an array, as well as range/point updates."
        }
      },
      {
        "@type": "Question",
        "name": "Why use Segment Tree instead of Prefix Sum?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Prefix sums provide O(1) queries but require O(N) time for rebuilding when an element is updated. Segment Trees handle both updates and queries in O(log N) time, making them far more efficient for dynamic arrays."
        }
      },
      {
        "@type": "Question",
        "name": "What is the time complexity of building a Segment Tree?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Building a Segment Tree takes O(N) time. The algorithm uses a divide-and-conquer strategy, visiting and computing each node in the tree exactly once."
        }
      },
      {
        "@type": "Question",
        "name": "What is the height of a Segment Tree?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The height of a Segment Tree is O(log N), because range boundaries are divided in half at each level from the root to the leaf nodes."
        }
      }
    ]
  };

  const learningResourceSchema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "Segment Tree Tutorial & Implementation Guide",
    "description": "Learn the theory, structure, construction, query, and point updates of Segment Trees with clean C++ source code.",
    "learningResourceType": "Tutorial",
    "educationalLevel": "Intermediate to Advanced",
    "author": {
      "@type": "Person",
      "name": "Yogesh Saini"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceSchema) }}
      />
      <SegmentTreeContent />
    </>
  );
}
