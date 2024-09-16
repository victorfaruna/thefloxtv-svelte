import type { PageServerLoad } from './$types';
import { fetchNetflix, fetchNowPlaying, fetchPrimeVideo, fetchTrending } from '$src/lib/fetch';

export const ssr = true;

export const load = (async () => {
	const [
		mainData,
		forYouData,
		trendingDataMovie,
		trendingDataTv,
		netflixDataMovie,
		netflixDataTv,
		primeVideoDataMovie,
		primeVideoDataTv
	] = await Promise.all([
		fetchNowPlaying(),
		fetchTrending('day', 'all', false),
		fetchTrending('day', 'movie', false),
		fetchTrending('day', 'tv', false),
		fetchNetflix('movie', true),
		fetchNetflix('tv', true),
		fetchPrimeVideo('movie', true),
		fetchPrimeVideo('tv', true)
	]);
	return {
		mainData,
		forYouData,
		trendingData: { movie: trendingDataMovie, tv: trendingDataTv },
		netflixData: { movie: netflixDataMovie, tv: netflixDataTv },
		primeVideoData: { movie: primeVideoDataMovie, tv: primeVideoDataTv }
	};
}) satisfies PageServerLoad;
