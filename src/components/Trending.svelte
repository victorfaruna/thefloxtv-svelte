<script lang="ts">
	let { trendingData }: { trendingData: { movie: any; tv: any } } = $props();
	let period = $state('day');
	let type = $state('movie');
	let data: any = $state(trendingData.movie);
	let isLoading = $state(false);
	let listIterator = 1;

	const setTrendingPeriod = (period: string | undefined) => {
		period = period;
	};
</script>

<div class="cont my-10">
	<div class="mb-5 flex sm:flex-col gap-5 sm:gap-3 items-center text-[12px]">
		<p class="uppercase text-[25px] sm:text-[17px] font-bold text-white">
			<i class="bi bi-file-play-fill text-[var(--color-3)]"></i>{' '}
			Trending {type == 'movie' ? 'Movies' : 'Tv Shows'}
		</p>

		<div class="flex gap-3 sm:gap-1 items-center text-[grey] sm:text-[11px]">
			<button
				onclick={() => setTrendingPeriod('day')}
				class={`px-3 py-1 border-[1.5px] rounded-md cursor-pointer ${
					period == 'day' ? ' border-color-3 text-color-3' : 'border-color-1/20'
				}`}
			>
				Today
			</button>
			<button
				onclick={() => setTrendingPeriod('week')}
				class={`px-3 py-1 border-[1.5px] rounded-md cursor-pointer ${
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
			{#if !isLoading}
				{#each data as result}
					<a href={result.media_type == 'movie' ? `/movies/${result.id}` : `/tv/${result.id}`}>
						<div class="group item w-auto h-auto flex relative" style="flex: 0 0 auto">
							<p
								class="group-hover:text-color-3/30 list-number w-auto h-auto center-div font-semibold text-[150px] font-[Lato,Lato-fallback,Arial,sans-serif] text-[#ffffff1e] sm:text-[100px]"
							>
								{listIterator++}
							</p>
							<div class=" w-[180px] sm:w-[150px] relative translate-x-[-10px]">
								<div
									class="group-hover:opacity-[1] opacity-[0] duration-[0.7s] w-full h-[250px] sm:h-[200px] rounded-md absolute z-[2] bg-gradient-to-t from-color-3 via-color-3/30 to-[transparent] flex items-center justify-center"
								>
									<i class="text-[50px] sm:text-[45px] text-black bi bi-play-circle-fill"></i>
								</div>
								<img
									class="object-cover rounded-md w-full h-[250px] sm:h-[200px] shadow-2xl"
									src={`https://themoviedb.org/t/p/w220_and_h330_face${result.poster_path}`}
									width={220}
									height={300}
									alt=""
								/>
								<!-- <TrendingLabel id={result.id} {type} /> -->
							</div>
						</div>
					</a>
				{/each}
			{/if}
		</div>
	</div>
</div>
