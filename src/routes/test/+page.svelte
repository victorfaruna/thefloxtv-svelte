<script>
	import tmdbScrape from '$lib/vidsrc';
	async function test() {
		const result = await tmdbScrape('76479', 'tv', 1, 1);
		console.log(result);
	}
</script>

<div class="container">
	<h1>Test</h1>
	<button onclick={test}>Test</button>
</div>
