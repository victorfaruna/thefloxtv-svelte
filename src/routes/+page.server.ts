import type { PageServerLoad } from './$types';
import { fetchNetflix, fetchNowPlaying, fetchPrimeVideo, fetchTrending } from '$src/lib/fetch';

export const ssr = true;

export const load = (async () => {
	const [mainData, forYouData] = await Promise.all([
		fetchTrending('day', 'all', false),
		fetchTrending('week', 'all', false)
	]);
	return {
		mainData,
		forYouData
	};
}) satisfies PageServerLoad;
