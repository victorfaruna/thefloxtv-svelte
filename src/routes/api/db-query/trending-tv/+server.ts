import { fetchTrending } from '$src/lib/fetch';
import { db } from '$src/lib/server/db';
import { trendingTvTable } from '$src/lib/server/schema';

export async function GET() {
	try {
		await db.delete(trendingTvTable);
		const trending1 = await fetchTrending('tv', 'day');
		for (const trending of trending1) {
			await db.insert(trendingTvTable).values({
				tmdb_id: trending.id,
				imdb_id: trending.imdb_id,
				name: trending.name ?? '',
				overview: trending.overview ?? '',
				popularity: trending.popularity ?? '',
				vote_average: trending.vote_average ?? '',
				vote_count: trending.vote_count ?? '',
				first_air_date: trending.first_air_date ?? '',
				last_air_date: trending.last_air_date ?? '',
				last_season: trending.last_episode_to_air?.season_number ?? '',
				last_episode: trending.last_episode_to_air?.episode_number ?? '',
				genre1: trending.genres[0]?.name ?? '',
				genre2: trending.genres[1]?.name ?? '',
				genre3: trending.genres[2]?.name ?? '',
				poster_path: trending.poster_path ?? '',
				backdrop_path: trending?.backdrop_path ?? '',
				logo_path: trending?.images?.logos[0]?.file_path ?? '',
				media_type: 'tv'
			});
		}
		return new Response(JSON.stringify({ message: 'success' }), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify(error), { status: 500 });
	}
}
