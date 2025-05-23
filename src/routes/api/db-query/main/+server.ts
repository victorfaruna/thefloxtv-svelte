import { fetchTrending } from '$src/lib/fetch';
import { db } from '$lib/server/db';
import { mainTable } from '$src/lib/server/schema';

export async function GET() {
	try {
		await db.delete(mainTable);
		const trending1 = await fetchTrending('all', 'day');
		for (const trending of trending1) {
			if (trending.media_type === 'movie') {
				await db.insert(mainTable).values({
					tmdb_id: trending.id,
					imdb_id: trending.imdb_id,
					title: trending.title ?? '',
					overview: trending.overview ?? '',
					popularity: trending.popularity ?? '',
					content_rating:
						trending.release_dates?.results?.filter(
							(item: any) => item.iso_3166_1 == 'US' || item.iso_3166_1 == 'CA'
						)[0]?.release_dates[0]?.certification ?? '',
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
					media_type: trending.media_type ?? ''
				});
			} else if (trending.media_type === 'movie') {
				await db.insert(mainTable).values({
					tmdb_id: trending.id,
					imdb_id: trending.imdb_id,
					name: trending.name,
					overview: trending.overview,
					popularity: trending.popularity,
					content_rating:
						trending.content_ratings?.results?.filter(
							(item: any) => item.iso_3166_1 == 'US' || item.iso_3166_1 == 'CA'
						)[0]?.rating ?? '',
					vote_average: trending.vote_average,
					vote_count: trending.vote_count,
					first_air_date: trending.first_air_date,
					last_air_date: trending.last_air_date,
					last_season: trending.last_episode_to_air?.season_number,
					last_episode: trending.last_episode_to_air?.episode_number,
					genre1: trending.genres[0]?.name ?? '',
					genre2: trending.genres[1]?.name ?? '',
					genre3: trending.genres[2]?.name ?? '',
					poster_path: trending.poster_path,
					backdrop_path: trending.backdrop_path,
					logo_path: trending.images?.logos[0]?.file_path ?? '',
					media_type: trending.media_type ?? ''
				});
			} else {
				continue;
			}
		}
		return new Response(JSON.stringify({ message: 'success' }), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify(error), { status: 500 });
	}
}
