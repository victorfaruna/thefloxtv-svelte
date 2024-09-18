import type { PageServerLoad } from './$types';
import { db } from '$src/lib/server/db.server';
import {
	forYouTable,
	mainTable,
	trendingMoviesTable,
	trendingTvTable
} from '$src/lib/server/schema';

export const load = (async () => {
	const [mainData, forYouData, trendingMoviesData, trendingTvData] = await Promise.all([
		db.select().from(mainTable),
		db.select().from(forYouTable),
		db.select().from(trendingMoviesTable),
		db.select().from(trendingTvTable)
	]);
	return {
		mainData,
		forYouData,
		trendingMoviesData,
		trendingTvData
	};
}) satisfies PageServerLoad;
