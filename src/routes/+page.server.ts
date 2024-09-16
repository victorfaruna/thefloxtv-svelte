import type { PageServerLoad } from './$types';
import { fetchNetflix, fetchNowPlaying, fetchPrimeVideo, fetchTrending } from '$src/lib/fetch';

export const ssr = true;

export const load = (async () => {
	const [mainData, forYouData] = await Promise.all([
		fetchNowPlaying(),
		fetchTrending('day', 'all', false)
	]);
	return {
		mainData,
		forYouData
	};
}) satisfies PageServerLoad;
