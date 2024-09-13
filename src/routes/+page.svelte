<script>
	import ForYou from '$components/ForYou.svelte';
	import Main from '$components/Main.svelte';
	import Trending from '$components/Trending.svelte';
	const { data } = $props();
	const { isFetchError, mainData, forYouData, trendingData } = data;
	if (isFetchError) {
		alert('Something went wrong!');
	}
</script>

<Main {mainData} />
<div class="px-10 sm:px-3">
	<ForYou {forYouData} />
	<Trending {trendingData} trendingType="movie" />
	<Trending {trendingData} trendingType="tv" />
</div>
