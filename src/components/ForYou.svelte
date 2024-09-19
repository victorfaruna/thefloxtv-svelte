<script lang="ts">
	import Swiper from 'swiper';
	import 'swiper/css';
	import 'swiper/css/navigation';
	import 'swiper/css/pagination';
	import { getLetterRange, getWordRange } from '$src/lib';
	import { Autoplay, Navigation, Pagination } from 'swiper/modules';
	let isLoading = $state(false);
	let { forYouData }: any = $props();

	let width = $state(1000);
	let swiperComponent: any;
	$effect(() => {
		width = window.innerWidth;
		window.addEventListener('resize', () => {
			width = window.innerWidth;
		});
		const swiper = new Swiper(swiperComponent, {
			modules: [Autoplay, Navigation, Pagination],
			loop: true,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false
			},
			pagination: {
				el: '.swiper-progress',
				type: 'progressbar'
			},

			breakpoints: {
				900: {
					slidesPerView: 3,
					slidesPerGroup: 3
				},
				680: {
					slidesPerView: 2,
					slidesPerGroup: 2
				},
				200: {
					slidesPerView: 1,
					slidesPerGroup: 1
				}
			},
			spaceBetween: 15
		});
		return () => {
			swiper.destroy();
			window.removeEventListener('resize', () => (width = window.innerWidth));
		};
	});
	const swipeNext = () => {
		swiperComponent.swiper.slideNext();
	};
	const swipePrev = () => {
		swiperComponent.swiper.slidePrev();
	};
</script>

<div class="wrapper mt-[-10rem] relative z-[3] md:mt-[1rem]">
	<div class="text-center mb-3 text-[13px] flex gap-2 justify-center items-center">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			class="bi bi-fire size-3"
			viewBox="0 0 16 16"
		>
			<path
				d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15"
			/>
		</svg>
		<p>For You</p>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			class="bi bi-fire size-3"
			viewBox="0 0 16 16"
		>
			<path
				d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15"
			/>
		</svg>
	</div>
	<div class="w-full sm:px-1 flex gap-2">
		<div bind:this={swiperComponent} class="swiper w-full h-[14rem] sm:h-[10rem]">
			<div class="swiper-wrapper">
				{#if isLoading}
					Loading
				{:else}
					{#each forYouData.slice(0, 9) as result}
						<div class="swiper-slide relative">
							<a
								data-sveltekit-preload-data
								href={result.media_type == 'movie'
									? `/movie/${result.tmdb_id}`
									: `/tv/${result.id}`}
							>
								<div
									class="inner foryou-inner w-full h-[95%] p-5 rounded-2xl flex flex-col justify-end group"
									style="background-Image: url(https://image.tmdb.org/t/p/original{result.backdrop_path}); background-size: cover;"
								>
									<p
										class="text-[17px] sm:text-[15px] font-bold relative z-[2] text-gray-300 w-[60%] overflow-hidden text-ellipsis whitespace-nowrap"
									>
										{result.media_type == 'movie'
											? result.title.toUpperCase()
											: result.name.toUpperCase()}
									</p>
									<p class="text-[12px] font-[500] relative z-[2] text-color-3 p flex gap-2">
										<span>{result.genre1}</span>
										<span>{result.genre2}</span>
										<span>{result.genre3}</span>
									</p>
								</div>
							</a>
						</div>
					{/each}
				{/if}
			</div>
			<div class="swiper-progress relative z-[2]"></div>
		</div>

		<div class="controls w-[40px] flex flex-col gap-3 text-color-1/30 sm:hidden">
			<button
				aria-label="Slide Next"
				class="w-full h-full rounded-lg center-div bg-color-1/20 glassmorphism"
				onclick={() => swipeNext()}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					class="bi bi-caret-right-fil size-8"
					viewBox="0 0 16 16"
				>
					<path
						d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"
					/>
				</svg>
			</button>
			<button
				aria-label="Slide Prev"
				class="w-full h-full rounded-lg center-div bg-color-1/20 glassmorphism"
				onclick={() => swipePrev()}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					class="bi bi-caret-left-fill size-8"
					viewBox="0 0 16 16"
				>
					<path
						d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"
					/>
				</svg>
			</button>
		</div>
	</div>
</div>

<style>
	.foryou-inner {
		border: 1px solid rgba(var(--bg-color-2));
		background-color: rgb(var(--bg-color-1));
		box-shadow: inset 0 0 80px transparent;
		background-position: center;
		transition: all 0.3s ease-in-out;
		position: relative;
	}
	.foryou-inner:hover {
		box-shadow: inset 0 0 80px rgba(var(--color-3));
		border: 1px solid rgba(var(--color-3));
	}

	.foryou-inner::after {
		content: '';
		bottom: 0;
		left: 0;
		right: 0;
		position: absolute;
		box-shadow: 1px 0 150px 90px rgb(var(--bg-color-1));
	}
</style>
