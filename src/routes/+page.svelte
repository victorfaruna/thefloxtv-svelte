<script>
	import Main from '$components/Main.svelte';

	export let data;
	const { trendingData } = data;
</script>

<Main {trendingData} />
