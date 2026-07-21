import AboutContent from "./AboutContent";

export const metadata = {
  title: "About the Creator & Project | Segment Tree Visualizer",
  description: "Learn about the motivations behind building the Segment Tree Visualizer, see the roadmap, and get in touch with Yogesh Saini (Full-Stack Developer).",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About the Creator & Project | Segment Tree Visualizer",
    description: "Learn about the motivations behind building the Segment Tree Visualizer, see the roadmap, and get in touch with Yogesh Saini (Full-Stack Developer).",
    url: "https://segment-tree-visualization.vercel.app/about",
  },
  twitter: {
    title: "About the Creator & Project | Segment Tree Visualizer",
    description: "Learn about the motivations behind building the Segment Tree Visualizer, see the roadmap, and get in touch with Yogesh Saini (Full-Stack Developer).",
  }
};

export default function AboutPage() {
  return <AboutContent />;
}
