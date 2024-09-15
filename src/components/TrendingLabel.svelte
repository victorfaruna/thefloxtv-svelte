<script lang="ts">
	import { getLetterRange } from '$lib';
	import { getMovieDetails, getSeriesDetails } from '$lib/fetch';
	import { onMount } from 'svelte';

	let { id, type } = $props();
	let data: any = $state();
	let isLoading = $state(true);

	onMount(async () => {
		isLoading = true;
		const response = type == 'movie' ? await getMovieDetails(id) : await getSeriesDetails(id);
		data = response;
		isLoading = false;
	});
</script>

{#if isLoading}
	<p class="my-2 h-3 skeleton"></p>
	<p class="w-[60%] my-2 h-3 skeleton"></p>
{:else}
	<div class="w-full flex gap-2 text-[12px] items-center justify-between px-[1px] py-2">
		<p>
			{type == 'movie'
				? getLetterRange(data.release_date, 4)
				: getLetterRange(data.first_air_date, 4)}
		</p>
		<p class="border border-[grey] rounded-lg px-[5px] py-[0.5px]">
			{type}
		</p>
		<p>
			{type == 'movie'
				? data.runtime + ` min`
				: `Season ${
						data.last_episode_to_air?.season_number ? data.last_episode_to_air?.season_number : '?'
					}`}
		</p>
	</div>
	<div>
		<p
			class="text-[14px] sm:text-[12px] text-[lightgrey] w-full whitespace-nowrap overflow-ellipsis overflow-hidden"
		>
			{type == 'movie' ? data.title : data.name}
		</p>
	</div>
{/if}
