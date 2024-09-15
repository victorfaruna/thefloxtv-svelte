<script>
	import ForYou from '$components/ForYou.svelte';
	import Main from '$components/Main.svelte';
	import Netflix from '$components/Netflix.svelte';
	import Trending from '$components/Trending.svelte';
	const { data } = $props();
	const { mainData, forYouData, trendingData, netflixData } = data;
</script>

<Main {mainData} />
<div class="px-10 sm:px-3">
	<ForYou {forYouData} />
	<Trending {trendingData} trendingType="movie" />
	<Trending {trendingData} trendingType="tv" />
	<Netflix {netflixData} />
</div>
