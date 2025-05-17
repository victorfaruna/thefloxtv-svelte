<script lang="ts">
	let { listType, listTitle, listData }: any = $props();
	let data = listData;

	// async function fetchData() {
	// 	switch (listType) {
	// 		case 'top-airing':
	// 			data = await fetchTrending('all', 'week');
	// 			break;
	// 		case 'latest':
	// 			data = fetchTrending('all', 'week');
	// 			break;
	// 		case 'upcoming':
	// 			data = data.upcoming;
	// 			break;
	// 	}
	// }

	// onMount(async () => {
	// 	listData ? '' : await fetchData();
	// });
</script>

<div class="list-container w-full overflow-hidden max-sm:pr-4">
	<p class="list-title text-color-3 mb-6 text-[1rem] font-semibold">{listTitle}</p>
	<div class="inner flex flex-col gap-3">
		{#each data.sort((a: any, b: any) => b.title - a.title).slice(0, 5) as item}
			<a href={`/${item.name ? 'tv' : 'movie'}/${item.tmdb_id ?? item.id}`}>
				<div class="item border-color-1/[0.1] flex w-[95%] items-center gap-4 border-b pb-3">
					<img
						class="h-[80px] w-[60px] rounded-md object-cover"
						src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
						alt="poster"
					/>
					<div class="info flex flex-col gap-2">
						<p
							class=" w-[90%] overflow-hidden text-[0.8rem] font-[500] overflow-ellipsis whitespace-nowrap text-white/90"
						>
							{item.name ? item.name : item.title}
						</p>
						<div class="flex gap-1 overflow-hidden">
							<span
								class="text-main rounded-l-[0.29rem] bg-green-300 px-2 py-[1px] text-[0.7rem] font-semibold"
								>{item.release_date
									? item.release_date.slice(0, 4)
									: item.first_air_date.slice(0, 4)}
							</span>
							<span
								class="text-main rounded-r-[0.29rem] bg-pink-300 px-2 py-[1px] text-[0.7rem] font-semibold"
								>{item.vote_average.toFixed(1)}
							</span>
							&middot;
							<span class="font-semibold uppercase">{item.media_type}</span>
						</div>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>
