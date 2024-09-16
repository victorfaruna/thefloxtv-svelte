<script lang="ts">
	import { fetchTrending } from '$src/lib/fetch';
	import { onMount } from 'svelte';
	import LoadTrending from './loading/LoadTrending.svelte';
	import TrendingLabel from './TrendingLabel.svelte';

	//Page props..
	let { trendingType = 'movie' }: { trendingType?: 'movie' | 'tv' } = $props();
	let trendingData: any = $state([]);

	let period = $state('day');
	let type = trendingType;
	let isLoading = $state(true);
	let data: any = $state([]);

	onMount(async () => {
		const [trendingDataDay, trendingDataWeek] = await Promise.all([
			fetchTrending('day', type),
			fetchTrending('week', type)
		]);
		trendingData = { day: trendingDataDay, tv: trendingDataWeek };
		data = trendingData.day;
		isLoading = false;
	});

	const setTrendingPeriod = async (newPeriod: string) => {
		if (newPeriod == period) return;
		if (newPeriod == 'day') {
			data = trendingData.day;
			period = newPeriod;
		} else {
			data = trendingData.tv;
		}
	};
</script>

<div class="cont my-10">
	<div class="mb-5 justify-center flex sm:flex-col gap-5 sm:gap-3 items-center text-[12px]">
		<div class="uppercase text-[25px] sm:text-[17px] font-bold text-white flex gap-1 items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				class="bi bi-file-play-fill size-[25px] sm:size-[17px] text-color-3"
				viewBox="0 0 16 16"
			>
				<path
					d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M6 5.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V5.884z"
				/>
			</svg>
			<p>Trending {type == 'movie' ? 'Movies' : 'Tv Shows'}</p>
		</div>

		<div class="flex gap-3 sm:gap-1 items-center text-[grey] sm:text-[11px]">
			<button
				aria-label="Today"
				onclick={() => setTrendingPeriod('day')}
				class={`px-3 py-1 border-[1.5px] rounded-md cursor-pointer active:border-color-3 active:text-color-3 ${
					period == 'day' ? ' border-color-3 text-color-3' : 'border-color-1/20'
				}`}
			>
				Today
			</button>
			<button
				aria-label="This Week"
				onclick={() => setTrendingPeriod('week')}
				class={`px-3 py-1 border-[1.5px] rounded-md cursor-pointer active:border-color-3 active:text-color-3 ${
					period == 'week' ? ' border-color-3 text-color-3' : 'border-color-1/20'
				}`}
			>
				This Week
			</button>
		</div>
	</div>

	<div class="trending-cont mb-[50px] flex sm:flex-col">
		<div
			class="scroll-container no-scrollbar"
			style="display: flex; flex-wrap: nowrap; width: 100%; height: auto; overflow-x: auto;"
		>
			{#if isLoading || (data && data.length == 0)}
				<LoadTrending />
			{:else}
				{#each data as result, index}
					<a
						data-sveltekit-preload-data
						href={result.media_type == 'movie' ? `/movie/${result.id}` : `/tv/${result.id}`}
					>
						<div class="group item w-auto h-auto items-center flex relative" style="flex: 0 0 auto">
							<p
								class="group-hover:text-color-3/10 list-number w-auto center-div font-semibold text-[120px] font-[Lato,Lato-fallback,Arial,sans-serif] text-[#ffffff1e] sm:text-[100px]"
							>
								{index + 1}
							</p>
							<div class=" w-[180px] sm:w-[150px] relative translate-x-[-10px]">
								<div
									class="group-hover:opacity-[1] opacity-[0] duration-[0.7s] w-full h-[250px] sm:h-full rounded-md absolute z-[2] bg-gradient-to-t from-color-3 via-color-3/30 to-[transparent] flex items-center justify-center"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										class="bi bi-play-circle-fill size-[50px] sm:size-[45px] text-black"
										viewBox="0 0 16 16 "
									>
										<path
											d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"
										/>
									</svg>
								</div>
								<img
									class="object-cover rounded-md w-full h-[250px] sm:h-[200px] shadow-2xl"
									src={`https://themoviedb.org/t/p/w220_and_h330_face${result.poster_path}`}
									width={220}
									height={300}
									alt=""
								/>
								<TrendingLabel data={result} {type} />
							</div>
						</div>
					</a>
				{/each}
			{/if}
		</div>
	</div>
</div>
