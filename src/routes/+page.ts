import axios from 'axios';
import type { PageLoad } from './$types';
import { fetchTrending } from '$src/lib/fetch';

// export const ssr = false;
// export const prerender = false;

export const load = (async () => {
	const [fetch1, fetch2] = await Promise.all([fetchTrending('day'), fetchTrending('week')]);
	const response = await fetchTrending('day');
	return {
		trendingData: fetch1,
		forYouData: fetch2
	};
}) satisfies PageLoad;