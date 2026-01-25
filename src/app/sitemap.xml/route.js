import { NextResponse } from "next/server";

export async function GET() {
    const baseUrl = "https://segment-tree-visualization.vercel.app";

    const urls = [
        "",
        "/segment-tree",
        "/lazy-propagation-in-segment-tree",
        "/about",
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
            .map(
                (path) => `
  <url>
    <loc>${baseUrl}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
            )
            .join("")}
</urlset>`;

    return new NextResponse(sitemap, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
