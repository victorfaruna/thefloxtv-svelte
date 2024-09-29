<script lang="ts">
	import { fetchTrending } from '$src/lib/fetch';
	import { onMount } from 'svelte';

	let { listType, listTitle, listData }: any = $props();
	let data: any = $state(listData ?? []);

	async function fetchData() {
		switch (listType) {
			case 'top-airing':
				data = await fetchTrending('all', 'week');
				break;
			case 'latest':
				data = fetchTrending('all', 'week');
				break;
			case 'upcoming':
				data = data.upcoming;
				break;
		}
	}
	onMount(async () => {
		listData ? '' : await fetchData();
	});
</script>

<div class="list-container w-full overflow-hidden sm:pr-4">
	<p class="list-title text-[1rem] font-semibold text-color-3 mb-6">{listTitle}</p>
	<div class="inner flex flex-col gap-3">
		{#each data.slice(0, 5) as item}
			<div
				class="item w-full flex gap-4 items-center border-b border-color-1/10 py-3 last:border-none"
			>
				<img
					class="w-[60px] h-[80px] rounded-md object-cover"
					src={`http://image.tmdb.org/t/p/w185${item.poster_path}`}
					alt="poster"
				/>
				<div class="info flex flex-col gap-2">
					<p
						class=" text-white/90 font-[500] text-[0.8rem] w-full overflow-ellipsis overflow-hidden whitespace-nowrap"
					>
						{item.name ? item.name : item.title}
					</p>
					<div class="overflow-hidden flex gap-1">
						<span
							class="px-2 py-[1px] bg-green-200 text-main text-[0.7rem] font-semibold rounded-l-[0.29rem]"
							>{item.release_date ? item.release_date.slice(0, 4) : item.first_air_date.slice(0, 4)}
						</span>
						<span
							class="px-2 py-[1px] bg-pink-200 text-main text-[0.7rem] font-semibold rounded-r-[0.29rem]"
							>{item.vote_average.toFixed(1)}
						</span>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
