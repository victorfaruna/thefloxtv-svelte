<script>
	import ForYou from '$components/ForYou.svelte';
	import Main from '$components/Main.svelte';
	import Netflix from '$components/Netflix.svelte';
	import PrimeVideo from '$components/PrimeVideo.svelte';
	import Trending from '$components/Trending.svelte';
	const { data } = $props();
	const { mainData, forYouData, trendingMoviesData, trendingTvData } = data;
</script>

<Main {mainData} />
<div class="px-5 sm:px-3">
	<ForYou {forYouData} />
	<Trending trendingType="movie" trendingData={trendingMoviesData} />
	<Trending trendingType="tv" trendingData={trendingTvData} />
	<Netflix />
	<PrimeVideo />
</div>
