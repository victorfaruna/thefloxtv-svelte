<script lang="ts">
	import { fetchTrending } from '$src/lib/fetch';
	import { onMount } from 'svelte';
	import LoadTrending from './loading/LoadTrending.svelte';
	import TrendingLabel from './TrendingLabel.svelte';

	//Page props..
	let {
		trendingData,
		trendingType = 'movie'
	}: { trendingData: any; trendingType?: 'movie' | 'tv' } = $props();

	let type = trendingType;
	let isLoading = $state(false);
	let data: any = $state(trendingData);
</script>

<div class="cont my-10">
	<div class="mb-5 flex sm:flex-col gap-5 sm:gap-3 items-center justify-between text-[12px]">
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
		<div class="flex gap-2 items-center mr-6 sm:mr-0">
			<p>View all</p>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
				/>
			</svg>
		</div>
	</div>

	<div class="trending-cont h-auto overflow-hidden mb-[50px] flex sm:flex-col relative">
		<div
			class="scroll-container no-scrollbar flex flex-nowrap w-full h-auto overflow-x-auto gap-5 sm:gap-4"
		>
			{#if isLoading || (data && data.length == 0)}
				<LoadTrending />
			{:else}
				{#each data as result, index}
					<a
						data-sveltekit-preload-data
						href={result.media_type == 'movie'
							? `/movie/${result.tmdb_id}`
							: `/tv/${result.tmdb_id}`}
					>
						<div
							class="group item w-auto h-auto items-center flex relative glassmorphism bg-color-1/20 rounded-xl p-2"
							style="flex: 0 0 auto"
						>
							<div class=" w-[180px] sm:w-[150px] h-auto relative translate-">
								<div class="image-container w-full h-auto overflow-hidden relative">
									<div
										class="group-hover:opacity-[1] opacity-[0] duration-[0.7s] w-full h-full rounded-md absolute z-[2] bg-gradient-to-t from-color-3 via-color-3/30 to-[transparent] flex items-center justify-center"
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
										class="object-cover rounded-lg w-full shadow-2xl bg-color-1/5 h-[260px] sm:h-[215px]"
										src={`https://themoviedb.org/t/p/w220_and_h330_face${result.poster_path}`}
										width={220}
										height={300}
										alt=""
									/>
								</div>
								<TrendingLabel data={result} {type} />
							</div>
						</div>
					</a>
				{/each}
			{/if}
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
