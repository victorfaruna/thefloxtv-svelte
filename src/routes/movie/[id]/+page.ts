import { getMovieDetails } from '$src/lib/fetch';
import type { PageLoad } from './$types';

export const load: PageLoad = (async ({ params }) => {
	const id = params.id;
	const response = await getMovieDetails(id);
	return {
		movieData: response
	};
}) satisfies PageLoad;
