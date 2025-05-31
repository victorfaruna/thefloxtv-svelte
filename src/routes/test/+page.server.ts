import type { PageServerLoad } from './$types';
import { getVideo } from '$src/lib/server/vidlink';
export const load = (async () => {
	const video = await getVideo({
		id: '786892',
		type: 'movie'
	});
	return {
		video
	};
}) satisfies PageServerLoad;
