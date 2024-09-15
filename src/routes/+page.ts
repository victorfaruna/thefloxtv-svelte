import axios from 'axios';
import type { PageLoad } from './$types';
import { fetchNetflix, fetchNowPlaying, fetchTrending } from '$src/lib/fetch';

export const ssr = true;

export const load = (async () => {
	const [fetch1, fetch2, fetch3, fetch4, fetch5, fetch6] = await Promise.all([
		fetchNowPlaying(),
		fetchTrending('day', 'all'),
		fetchTrending('day', 'movie'),
		fetchTrending('day', 'tv'),
		fetchNetflix('movie'),
		fetchNetflix('tv')
	]);
	return {
		mainData: fetch1,
		forYouData: fetch2,
		trendingData: { movie: fetch3, tv: fetch4 },
		netflixData: { movie: fetch5, tv: fetch6 }
	};
}) satisfies PageLoad;
