import axios from 'axios';
import type { PageLoad } from './$types';
import { fetchNowPlaying, fetchTrending } from '$src/lib/fetch';

// export const ssr = false;
// export const prerender = false;

export const load = (async () => {
	const [fetch1, fetch2] = await Promise.all([fetchTrending('day'), fetchNowPlaying()]);
	return {
		mainData: fetch2,
		forYouData: fetch1
	};
}) satisfies PageLoad;
