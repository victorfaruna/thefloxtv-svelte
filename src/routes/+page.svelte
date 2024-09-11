<script>
	import Main from '$components/Main.svelte';
	const { data } = $props();
	const { trendingData } = data;
</script>

<Main {trendingData} />
