<script>
	import Footer from '$components/Footer.svelte';
	import ForYou from '$components/ForYou.svelte';
	import Header from '$components/Header.svelte';
	import ListSectionItem from '$components/ListSectionItem.svelte';
	import Main from '$components/Main.svelte';
	import Netflix from '$components/Netflix.svelte';
	import PrimeVideo from '$components/PrimeVideo.svelte';
	import Trending from '$components/Trending.svelte';
	const { data } = $props();
	const { mainData, forYouData, trendingMoviesData, trendingTvData, topTenData } = data;
</script>

<Header />
<Main {mainData} />
<div class="px-5 max-sm:px-3">
	<ForYou {forYouData} />
</div>
<div class="pl-6 max-sm:pl-4">
	<Trending trendingType="movie" trendingData={trendingMoviesData} />
	<Trending trendingType="tv" trendingData={trendingTvData} />

	<div
		class="list-section grid gap-3 max-sm:grid-cols-1 max-sm:gap-10"
		style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));"
	>
		<ListSectionItem listType="top-airing" listTitle="Top Airing" listData={forYouData} />
		<ListSectionItem listType="top-rated" listTitle="Top Rated" listData={mainData} />
		<ListSectionItem listType="upcoming" listTitle="Top 10 Movies" listData={topTenData.movie} />
		<ListSectionItem listType="now-playing" listTitle="Top 10 TV Shows" listData={topTenData.tv} />
	</div>
	<Netflix />
	<PrimeVideo />
	<!-- <Footer /> -->
</div>
