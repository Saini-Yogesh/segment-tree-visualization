import LazyPropagationContent from "./LazyPropagationContent";

export const metadata = {
  title: "Lazy Propagation in Segment Tree: Range Updates Guide",
  description: "Learn Lazy Propagation in Segment Trees. Understand deferred range updates, push operations, and O(log N) range queries with C++ code & illustrations.",
  alternates: {
    canonical: "/lazy-propagation-in-segment-tree",
  },
  keywords: [
    "lazy propagation",
    "lazy propagation in segment tree",
    "range update segment tree",
    "lazy propagation push function",
    "segment tree lazy propagation range sum",
    "lazy propagation complexity",
    "segment tree range updates lazy propagation c++"
  ],
  openGraph: {
    title: "Lazy Propagation in Segment Tree: Range Updates Guide",
    description: "Learn Lazy Propagation in Segment Trees. Understand deferred range updates, push operations, and O(log N) range queries with C++ code & illustrations.",
    url: "https://segment-tree-visualization.vercel.app/lazy-propagation-in-segment-tree",
  },
  twitter: {
    title: "Lazy Propagation in Segment Tree: Range Updates Guide",
    description: "Learn Lazy Propagation in Segment Trees. Understand deferred range updates, push operations, and O(log N) range queries with C++ code & illustrations.",
  }
};

export default function SegmentTreeLazyPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Lazy Propagation in a Segment Tree?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Lazy Propagation is an optimization technique used in Segment Trees to handle range updates efficiently. It works by postponing updates to child nodes and applying them only when the nodes are accessed."
        }
      },
      {
        "@type": "Question",
        "name": "Why is Lazy Propagation needed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Without lazy propagation, a range update would require visiting and updating every element in that range individually, resulting in O(N) time complexity. Lazy propagation reduces this to O(log N) by caching updates at parent nodes."
        }
      },
      {
        "@type": "Question",
        "name": "What does the lazy array store?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The lazy array stores pending updates for segment tree nodes. When a node's range is completely inside the update query range, the node is updated and its lazy value is flagged so that the children can be updated later on-demand."
        }
      },
      {
        "@type": "Question",
        "name": "What is the push operation in Lazy Propagation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The push operation propagates any pending lazy updates from a parent node down to its two children. This updates the children's actual values and updates their lazy markers, before resetting the parent's lazy value to 0."
        }
      }
    ]
  };

  const learningResourceSchema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "Lazy Propagation in Segment Tree Guide",
    "description": "Learn range updates, push operations, deferred propagation, and time complexity optimizations in Segment Trees.",
    "learningResourceType": "Tutorial",
    "educationalLevel": "Advanced",
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
      <LazyPropagationContent />
    </>
  );
}
