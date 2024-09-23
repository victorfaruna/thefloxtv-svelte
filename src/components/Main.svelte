<script lang="ts">
	import Swiper from 'swiper/bundle';
	import 'swiper/css/bundle';
	import { getLetterRange, getWordRange } from '$src/lib';
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
	<div bind:this={swiperComponent} class="swiper carousel w-full h-screen md:h-[400px]">
		<div class="swiper-wrapper">
			{#each mainData.slice(0, 10) as result, index (result.id)}
				<div
					class="swiper-slide carousel-item relative main-carousel"
					style="background-size:cover; background-image: url({width > 1000
						? `https://image.tmdb.org/t/p/original${result.backdrop_path}`
						: `https://image.tmdb.org/t/p/w1280${result.backdrop_path}`});"
				>
					<div
						class="inner-container w-full h-full flex flex-col justify-center md:justify-end px-7 sm:px-4 relative z-[50]"
					>
						<div
							class="text w-[50%] h-auto md:mb-[2rem] overflow-hidden sm:w-full sm:text-center flex flex-col gap-2"
						>
							<p class="text-[1.5rem] text-color-3 sm:text-[0.9rem]">#{index + 1} Spotlight</p>
							<p class="text-[2.7rem] text-white font-semibold sm:text-[1.5rem]">
								{result.name ? result.name : result.title}
							</p>
							<!-- <MovieLogo
								movieLogo={result.logo_path}
								movieTitle={result.name ? result.name : result.title}
							/> -->

							<div
								class="info flex text-white items-center font-[500] sm:justify-center gap-6 sm:gap-3 text-[1rem] sm:text-[0.7rem]"
								style="text-shadow: 0 1px 2px #000;"
							>
								<span
									class="certification center-div px-[7px] py-[0.5px] bg-color-3 rounded-2xl font-bold text-[11px] text-black"
									style="text-shadow: none">HD</span
								>
								<span
									class="certification center-div px-[7px] py-[0.5px] rounded-2xl font-bold text-[11px] border"
									>R</span
								>
								<span>
									{result.media_type === 'movie'
										? getLetterRange(result.release_date, 4)
										: getLetterRange(result.first_air_date, 4)}
								</span>
								<span class="flex gap-1 items-center">
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
								class="desc sm:hidden mr-8 sm:mr-0 text-color-1 mb-2 leading-6 text-[1rem]"
								style="text-shadow: 0 1px 2px #000"
							>
								{result.overview.split(/\s+/).length > 45
									? getWordRange(result.overview, 45)
									: result.overview}
							</p>
							<div class="buttons flex gap-5 flex-wrap sm:justify-center font-[500]">
								<a
									data-sveltekit-preload-data
									href={result.media_type === 'movie'
										? `/movie/${result.tmdb_id}`
										: `/tv/${result.tmdb_id}`}
								>
									<button
										class="view-btn w-[160px] h-[43px] text-black bg-color-3 rounded-[1.5rem] center-div gap-2"
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
									class="center-div w-[130px] h-[43px] rounded-[1.5rem] bg-color-1/50 gap-1"
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
		z-index: 1;
		top: 0;
		position: absolute;
		background: linear-gradient(
			90deg,
			rgba(var(--bg-color-1)) 0,
			rgba(var(--bg-color-1)) 0,
			rgba(24, 24, 24, 0) 100%
		);
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
</style>
