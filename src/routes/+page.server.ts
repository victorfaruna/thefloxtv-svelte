import type { PageServerLoad } from './$types';
import { db } from '$src/lib/server/db';

import {
	forYouTable,
	mainTable,
	trendingMoviesTable,
	trendingTvTable
} from '$src/lib/server/schema';
import { fetchTrending } from '$src/lib/fetch';
export const load = (async () => {
	const [mainData, forYouData, trendingMoviesData, trendingTvData, topTenMovies, topTenSeries] =
		await Promise.all([
			db.select().from(mainTable),
			db.select().from(forYouTable),
			db.select().from(trendingMoviesTable),
			db.select().from(trendingTvTable),
			fetchTrending('movie', 'week'),
			fetchTrending('tv', 'week')
		]);
	return {
		mainData,
		forYouData,
		trendingMoviesData,
		trendingTvData,
		topTenData: { movie: topTenMovies, tv: topTenSeries }
	};
}) satisfies PageServerLoad;
