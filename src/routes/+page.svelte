<script>
	import ForYou from '$components/ForYou.svelte';
	import Main from '$components/Main.svelte';
	const { data } = $props();
	const { mainData } = data;
	const { forYouData } = data;
</script>

<Main {mainData} />
<div class="px-5 sm:px-3">
	<ForYou {forYouData} />
</div>
