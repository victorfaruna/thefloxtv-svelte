<script>
	import ForYou from '$components/ForYou.svelte';
	import Main from '$components/Main.svelte';
	const { data } = $props();
	const { trendingData } = data;
</script>

<Main {trendingData} />
<div class="px-[3%]">
	<ForYou {trendingData} />
</div>
