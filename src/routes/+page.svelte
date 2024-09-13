<script>
	import ForYou from '$components/ForYou.svelte';
	import Main from '$components/Main.svelte';
	import Trending from '$components/Trending.svelte';
	const { data } = $props();
	const { mainData, forYouData, trendingData } = data;
</script>

<Main {mainData} />
<div class="px-5 sm:px-3">
	<ForYou {forYouData} />
	<Trending {trendingData} />
</div>
