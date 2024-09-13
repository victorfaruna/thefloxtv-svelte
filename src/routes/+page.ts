import axios from 'axios';
import type { PageLoad } from './$types';
import { fetchNowPlaying, fetchTrending } from '$src/lib/fetch';

// export const ssr = false;
// export const prerender = false;

export const load = (async () => {
	const [fetch1, fetch2, fetch3, fetch4] = await Promise.all([
		fetchNowPlaying(),
		fetchTrending('day', 'all'),
		fetchTrending('day', 'movie'),
		fetchTrending('day', 'tv')
	]);
	return {
		mainData: fetch1,
		forYouData: fetch2,
		trendingData: { movie: fetch3, tv: fetch4 }
	};
}) satisfies PageLoad;
