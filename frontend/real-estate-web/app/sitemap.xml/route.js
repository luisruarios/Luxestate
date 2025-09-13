import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://luxestate.vercel.app';

  // In a real app, you would fetch property IDs from your database
  const propertyIds = ['1', '2', '3', '4', '5', '6', '7', '8']; // Sample IDs

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${propertyIds.map(id => `
  <url>
    <loc>${baseUrl}/property/${id}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
