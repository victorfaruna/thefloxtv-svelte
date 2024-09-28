import { fetchTrending } from '$src/lib/fetch';
import { db } from '$src/lib/server/db';
import { trendingMoviesTable } from '$src/lib/server/schema';

export async function GET() {
	try {
		await db.delete(trendingMoviesTable);
		const trending1 = await fetchTrending('movie', 'day');
		for (const trending of trending1) {
			await db.insert(trendingMoviesTable).values({
				tmdb_id: trending.id,
				imdb_id: trending.imdb_id,
				title: trending.title ?? '',
				overview: trending.overview ?? '',
				popularity: trending.popularity ?? '',
				vote_average: trending.vote_average ?? '',
				vote_count: trending.vote_count ?? '',
				runtime: trending.runtime ?? '',
				release_date: trending.release_date ?? '',
				genre1: trending?.genres[0]?.name ?? '',
				genre2: trending?.genres[1]?.name ?? '',
				genre3: trending?.genres[2]?.name ?? '',
				poster_path: trending?.poster_path ?? '',
				backdrop_path: trending?.backdrop_path ?? '',
				logo_path: trending.images?.logos[0]?.file_path ?? '',
				media_type: 'movie'
			});
		}
		return new Response(JSON.stringify({ message: 'success' }), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify(error), { status: 500 });
	}
}
