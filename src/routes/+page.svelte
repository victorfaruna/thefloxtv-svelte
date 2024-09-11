<script>
	import Main from '$components/Main.svelte';

	export let data;
	const { trendingData } = data;
</script>

<svelte:head>
	<!-- <link rel="stylesheet" href="/css/MainCarousel.css" /> -->
</svelte:head>
<Main {trendingData} />
