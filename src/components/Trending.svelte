<script lang="ts">
	import LoadTrending from './loading/LoadTrending.svelte';

	//Page props..
	let {
		trendingData,
		trendingType = 'movie'
	}: { trendingData: any; trendingType?: 'movie' | 'tv' } = $props();

	let type = trendingType;
	let isLoading = $state(false);
	let data: any = $state(trendingData);

	let scrollCont: HTMLDivElement;

	const scrollItemLeft = () => {
		if (scrollCont) {
			scrollCont.scrollBy({ left: 200, behavior: 'smooth' });
		}
	};
</script>

<div class="cont my-10">
	<div class="inner mx-auto w-full max-w-[1900px] px-3 lg:px-6">
		<div class="mb-2 flex items-center justify-between gap-5 text-[12px] max-sm:gap-3">
			<div class=" text-color-3 flex items-center gap-1 text-[1.2rem] font-bold max-sm:text-[1rem]">
				<!-- <svg
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				class="bi bi-file-play-fill size-[25px] max-sm:size-[17px] text-color-3"
				viewBox="0 0 16 16"
			>
				<path
					d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M6 5.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V5.884z"
				/>
			</svg> -->
				<p>Trending {type == 'movie' ? 'Movies' : 'Tv Shows'}</p>
			</div>
		</div>

		<div class="trending-cont relative mb-[50px] flex h-auto overflow-hidden max-sm:flex-col">
			<div
				class="absolute top-0 right-0 z-[100] flex h-[260px] w-[45px] items-center gap-2 max-sm:h-[215px]"
			>
				<button
					onclick={scrollItemLeft}
					aria-label="Scroll Left"
					class="bg-tet border-color-1/5 text-color-3 flex size-[40px] items-center justify-center rounded-full border"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
					</svg>
				</button>
			</div>

			<div
				bind:this={scrollCont}
				class="scroll-container no-scrollbar flex h-auto w-full flex-nowrap gap-5 overflow-x-auto max-sm:gap-4"
			>
				{#if isLoading || (data && data.length == 0)}
					<LoadTrending />
				{:else}
					{#each data.slice(0, 20) as result, index}
						<a
							data-sveltekit-preload-data
							href={result.media_type == 'movie'
								? `/movie/${result.tmdb_id}`
								: `/tv/${result.tmdb_id}`}
						>
							<div
								class="group item relative flex h-auto w-auto items-end gap-1"
								style="flex: 0 0 auto"
							>
								<div class="flex flex-col items-center gap-2 text-[1rem]">
									<p
										style="writing-mode: vertical-rl;  transform: rotate(180deg) "
										class="h-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap text-white/90 max-sm:h-[160px] max-sm:text-[0.8rem]"
									>
										{result.name ? result.name : result.title}
									</p>
									<p class="text-color-3 font-bold">{(index + 1).toString().padStart(2, '0')}</p>
								</div>

								<div class=" relative h-auto w-[160px] max-sm:w-[130px]">
									<div class="image-container relative h-auto w-full overflow-hidden">
										<div
											class="from-color-3 via-color-3/30 absolute z-[2] flex h-full w-full items-center justify-center bg-gradient-to-t to-[transparent] opacity-[0] duration-[0.7s] group-hover:opacity-[1]"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												class="bi bi-play-circle-fill size-[50px] text-black max-sm:size-[45px]"
												viewBox="0 0 16 16 "
											>
												<path
													d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"
												/>
											</svg>
										</div>
										<img
											loading="lazy"
											class="bg-color-1/5 h-[230px] w-full object-cover shadow-2xl max-sm:h-[190px]"
											src={`http://image.tmdb.org/t/p/w500${result.poster_path}`}
											alt=""
										/>
									</div>
									<!-- <TrendingLabel data={result} {type} /> -->
								</div>
							</div>
						</a>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.scroll-container::after {
		content: '';
		height: 100%;
		background-color: black;
		position: absolute;
		z-index: 10;
		bottom: 0;
		right: 0;
		box-shadow: 1px 0 90px 90px rgb(var(--bg-color-1));
	}

	@media (max-width: 768px) {
		.scroll-container::after {
			box-shadow: 1px 0 50px 60px rgb(var(--bg-color-1));
		}
	}
</style>
