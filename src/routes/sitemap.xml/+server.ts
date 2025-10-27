import { db } from '$src/lib/server/db';
import {
	mainTable,
	forYouTable,
	trendingMoviesTable,
	trendingTvTable
} from '$src/lib/server/schema';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const currentDate = new Date().toISOString().split('T')[0];

	try {
		// Fetch data from all tables
		const [mainData, forYouData, trendingMoviesData, trendingTvData] = await Promise.all([
			db.select().from(mainTable).limit(50),
			db.select().from(forYouTable).limit(50),
			db.select().from(trendingMoviesTable).limit(50),
			db.select().from(trendingTvTable).limit(50)
		]);

		// Combine all data and remove duplicates based on tmdb_id
		const allContent = [...mainData, ...forYouData, ...trendingMoviesData, ...trendingTvData];
		const uniqueContent = allContent.filter(
			(item, index, self) => index === self.findIndex((t) => t.tmdb_id === item.tmdb_id)
		);

		// Separate movies and TV shows
		const movies = uniqueContent.filter(
			(item) => item.media_type === 'movie' || (!item.media_type && item.title && !item.name)
		);
		const tvShows = uniqueContent.filter(
			(item) => item.media_type === 'tv' || (!item.media_type && item.name && !item.title)
		);

		// Generate sitemap XML
		let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  
  <!-- Homepage - Highest Priority -->
  <url>
    <loc>https://watchlens.xyz/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- About Page -->
  <url>
    <loc>https://watchlens.xyz/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Pricing Page -->
  <url>
    <loc>https://watchlens.xyz/pricing</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Test Page -->
  <url>
    <loc>https://watchlens.xyz/test</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>`;

		// Add movie URLs
		movies.forEach((movie) => {
			const title = movie.title || movie.name || 'Unknown Movie';
			const posterUrl = movie.poster_path
				? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
				: '';
			const overview = movie.overview || '';

			sitemap += `
  
  <!-- Movie: ${title} -->
  <url>
    <loc>https://watchlens.xyz/movie/${movie.tmdb_id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>`;

			if (posterUrl) {
				sitemap += `
    <image:image>
      <image:loc>${posterUrl}</image:loc>
      <image:title>${title}</image:title>
      <image:caption>${overview}</image:caption>
    </image:image>`;
			}

			sitemap += `
  </url>`;
		});

		// Add TV show URLs
		tvShows.forEach((show) => {
			const title = show.name || show.title || 'Unknown TV Show';
			const posterUrl = show.poster_path
				? `https://image.tmdb.org/t/p/w500${show.poster_path}`
				: '';
			const overview = show.overview || '';

			sitemap += `
  
  <!-- TV Show: ${title} -->
  <url>
    <loc>https://watchlens.xyz/tv/${show.tmdb_id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>`;

			if (posterUrl) {
				sitemap += `
    <image:image>
      <image:loc>${posterUrl}</image:loc>
      <image:title>${title}</image:title>
      <image:caption>${overview}</image:caption>
    </image:image>`;
			}

			sitemap += `
  </url>`;
		});

		sitemap += `
  
</urlset>`;

		return new Response(sitemap, {
			headers: {
				'Content-Type': 'application/xml',
				'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
			}
		});
	} catch (error) {
		console.error('Error generating sitemap:', error);

		// Fallback to basic sitemap if database query fails
		const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://watchlens.xyz/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://watchlens.xyz/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://watchlens.xyz/pricing</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

		return new Response(fallbackSitemap, {
			headers: {
				'Content-Type': 'application/xml',
				'Cache-Control': 'public, max-age=300' // Cache for 5 minutes on error
			}
		});
	}
};
