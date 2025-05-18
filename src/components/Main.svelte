<script lang="ts">
	import Swiper from 'swiper/bundle';
	import 'swiper/css/bundle';
	import { formatDate, getLetterRange, getWordRange } from '$src/lib';
	import MovieLogo from '$components/MovieLogo.svelte';
	import { onMount } from 'svelte';
	//
	let { mainData }: any = $props();
	let width = $state(1000);
	let swiperComponent: HTMLDivElement;
	onMount(() => {
		width = window.innerWidth;
		const swiper = new Swiper(swiperComponent, {
			effect: 'slide',
			loop: true,
			speed: 500,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false
			}
		});
		return () => {
			swiper.destroy();
		};
	});
	$effect(() => {
		width = window.innerWidth;
		window.addEventListener('resize', () => {
			width = window.innerWidth;
		});

		return () => {
			window.removeEventListener('resize', () => (width = window.innerWidth));
		};
	});
</script>

<div class="carousel-cont w-full overflow-hidden">
	<div bind:this={swiperComponent} class="swiper carousel h-[90vh] w-full max-sm:h-[400px]">
		<div class="swiper-wrapper">
			{#each mainData
				.filter((item: any) => item.vote_average > 6)
				.slice(0, 10) as result, index (result.id)}
				<div class="swiper-slide carousel-item main-carousel relative bg-cover bg-no-repeat">
					<div class="inner-container flex h-full w-full items-end pl-[3%] max-sm:pl-0">
						<div
							class="text absolute z-[2] mb-[4rem] flex h-auto w-[50%] flex-col gap-4 overflow-hidden max-sm:mb-[2rem] max-sm:w-full max-sm:gap-2 max-sm:text-center"
						>
							<p class="text-color-3 text-[1.2rem] max-sm:text-[0.9rem]">#{index + 1} Spotlight</p>
							<p
								class="w-full overflow-hidden text-[2.7rem] font-semibold overflow-ellipsis whitespace-nowrap text-white max-sm:px-[2rem] max-sm:text-[1.5rem]"
							>
								{result.name ? result.name : result.title}
							</p>
							<!-- <MovieLogo
								movieLogo={result.logo_path}
								movieTitle={result.name ? result.name : result.title}
							/> -->

							<div
								class="info flex flex-wrap items-center gap-6 text-[1rem] font-[500] text-white max-sm:justify-center max-sm:gap-3 max-sm:text-[0.7rem]"
							>
								<span
									class="certification center-div bg-color-3 rounded-2xl px-[7px] py-[0.5px] text-[11px] font-bold text-black"
									style="text-shadow: none">HD</span
								>
								<span
									class="certification center-div rounded-2xl border px-[7px] py-[0.5px] text-[11px] font-bold"
									>{result.content_rating == '' ? '?' : result.content_rating}</span
								>
								<span>
									<!-- {result.media_type === 'movie'
										? getLetterRange(result.release_date, 4)
										: getLetterRange(result.first_air_date, 4)} -->

									{result.media_type === 'movie'
										? formatDate(result.release_date)
										: formatDate(result.first_air_date)}
								</span>
								<span class="flex items-center gap-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-4"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
										/>
									</svg>

									{result.vote_average.toFixed(1)}
								</span>
							</div>
							<p
								class="desc text-color-1/60 mr-8 mb-2 text-[1rem] leading-6 max-sm:mr-0 max-sm:hidden"
								style="text-shadow: 0 1px 2px #000"
							>
								{result.overview.split(/\s+/).length > 45
									? getWordRange(result.overview, 25)
									: result.overview}
							</p>
							<div
								class="buttons flex flex-wrap gap-5 font-[500] max-sm:justify-center max-sm:gap-3"
							>
								<a
									data-sveltekit-preload-data
									href={result.media_type === 'movie'
										? `/movie/${result.tmdb_id}`
										: `/tv/${result.tmdb_id}`}
								>
									<button
										class="view-btn bg-color-3 center-div h-[43px] w-[160px] gap-2 rounded-[1.5rem] text-black"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											class="bi bi-play-circle-fill size-4"
											viewBox="0 0 16 16"
										>
											<path
												d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"
											/>
										</svg>
										Watch Now
									</button>
								</a>
								<button
									data-sveltekit-preload-data
									class="center-div bg-color-1/20 h-[43px] w-[130px] gap-1 rounded-[1.5rem] text-white/80"
								>
									Detail
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										class="size-4"
										viewBox="0 0 320 512"
										><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
											d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
										/>
									</svg>
								</button>
							</div>
						</div>
						<div
							class="absolute right-0 z-[-1] h-full w-[90%] bg-cover max-sm:w-full"
							style="background-image: url({width > 1000
								? `https://image.tmdb.org/t/p/original${result.backdrop_path}`
								: `https://image.tmdb.org/t/p/original${result.backdrop_path}`});"
						></div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.main-carousel {
		background-position: center;
	}
	.main-carousel::before {
		content: ' ';
		width: 100%;
		height: 100%;
		left: 0;
		z-index: 2;
		top: 0;
		position: absolute;
		background: linear-gradient(93deg, rgba(var(--bg-color-1)) 20%, rgba(var(--bg-color-1), 0));
	}
	.main-carousel::after {
		display: block;
		position: absolute;
		content: '';
		bottom: 0;
		left: 0;
		right: 0;
		box-shadow: 1px 0 100px 100px rgb(var(--bg-color-1));
	}

	@media (max-width: 768px) {
		.main-carousel::before {
			width: 100%;
			background: linear-gradient(90deg, rgba(var(--bg-color-1)), rgba(var(--bg-color-1), 0));
		}
	}
</style>
