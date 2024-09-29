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

	let scrollCont: HTMLDivElement;

	const scrollItemLeft = () => {
		if (scrollCont) {
			scrollCont.scrollBy({ left: 200, behavior: 'smooth' });
		}
	};
</script>

<div class="cont my-10">
	<div class="mb-2 flex gap-5 sm:gap-3 items-center justify-between text-[12px]">
		<div class=" text-[1.2rem] sm:text-[1rem] font-bold text-color-3 flex gap-1 items-center">
			<!-- <svg
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				class="bi bi-file-play-fill size-[25px] sm:size-[17px] text-color-3"
				viewBox="0 0 16 16"
			>
				<path
					d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M6 5.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V5.884z"
				/>
			</svg> -->
			<p>Trending {type == 'movie' ? 'Movies' : 'Tv Shows'}</p>
		</div>
	</div>

	<div class="trending-cont h-auto overflow-hidden mb-[50px] flex sm:flex-col relative">
		<div
			class="absolute w-[45px] h-[260px] sm:h-[215px] top-0 right-0 z-[100] flex gap-2 items-center"
		>
			<button
				onclick={scrollItemLeft}
				class="size-[40px] rounded-full bg-tet border border-color-1/5 text-color-3 flex items-center justify-center"
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
			class="scroll-container no-scrollbar flex flex-nowrap w-full h-auto overflow-x-auto gap-5 sm:gap-4"
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
							class="group item w-auto h-auto items-end flex gap-1 relative"
							style="flex: 0 0 auto"
						>
							<div class="flex flex-col gap-2 items-center text-[1rem]">
								<p
									style="writing-mode: vertical-rl;  transform: rotate(180deg) "
									class="sm:text-[0.8rem] h-[200px] sm:h-[160px] whitespace-nowrap overflow-ellipsis overflow-hidden text-white/90"
								>
									{result.name ? result.name : result.title}
								</p>
								<p class="text-color-3 font-bold">{(index + 1).toString().padStart(2, '0')}</p>
							</div>

							<div class=" w-[160px] sm:w-[130px] h-auto relative">
								<div class="image-container w-full h-auto overflow-hidden relative">
									<div
										class="group-hover:opacity-[1] opacity-[0] duration-[0.7s] w-full h-full absolute z-[2] bg-gradient-to-t from-color-3 via-color-3/30 to-[transparent] flex items-center justify-center"
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
										loading="lazy"
										class="object-cover w-full shadow-2xl bg-color-1/5 h-[230px] sm:h-[190px]"
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
