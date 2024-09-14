import { getSeriesDetails } from '$src/lib/fetch';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const id = params.id;
	const response = await getSeriesDetails(id);
	return {
		seriesData: response
	};
}) satisfies PageLoad;
