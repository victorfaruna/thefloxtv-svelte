import adapter from '@sveltejs/adapter-vercel';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({ runtime: 'nodejs20.x' }),
		alias: {
			$components: './src/components',
			$static: './static',
			$src: './src'
		}
	}
};
export default config;
