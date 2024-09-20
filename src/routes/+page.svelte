<script>
	import Footer from '$components/Footer.svelte';
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
</div>
<div class="pl-6 sm:pl-4">
	<Trending trendingType="movie" trendingData={trendingMoviesData} />
	<Trending trendingType="tv" trendingData={trendingTvData} />
	<Netflix />
	<PrimeVideo />
	<Footer />
</div>
