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
		console.log(width);
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
					slidesPerView: 3
				},
				680: {
					slidesPerView: 2
				},
				200: {
					slidesPerView: 1
				}
			},
			spaceBetween: 10
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

<div class="text-center my-5 mb-3 text-[13px] flex gap-2 justify-center items-center">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="currentColor"
		class="bi bi-fire size-4"
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
		class="bi bi-fire size-4"
		viewBox="0 0 16 16"
	>
		<path
			d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15"
		/>
	</svg>
</div>
<div class="w-full sm:px-1 flex gap-2">
	<div bind:this={swiperComponent} class="swiper w-full h-[220px] sm:h-[185px]">
		<div class="swiper-wrapper">
			{#if isLoading}
				Loading
			{:else}
				{#each forYouData.slice(0, 9) as result}
					<div class="swiper-slide p-[6px] relative overflow-hidden">
						<a href={result.media_type == 'movie' ? `/movie/${result.id}` : `/tv/${result.id}`}>
							<div
								class="a z-40 w-[120px] h-[35px] shadow-md rounded-bl-xl rounded-tr-xl bg-gray-100 absolute top-[0] right-[0] rounded-[inherit] text-[12px] font-semibold text-slate-700 flex items-center justify-center"
							>
								Trending Today
							</div>
							<div
								class="inner foryou-inner w-full h-[95%] relative p-0 rounded-xl group"
								style="background-Image: url(https://image.tmdb.org/t/p/w500{result.backdrop_path}); background-size: cover; "
							>
								<div
									class=" w-[100%] h-full absolute rounded-xl top-0 left-0 bottom-0 right-0 z-20 bg-gradient-to-t group-hover:bg-gradient-to-b transition-all duration-[1s] from-main group-hover:from-color-3/40 via-main/50 group-hover:via-color-3/5 to-[transparent] group-hover:to-main"
								></div>
								<div class="w-full absolute bottom-4 left-4 z-30">
									<p
										class="text-[17px] sm:text-[15px] font-semibold text-gray-300 w-[60%] overflow-hidden text-ellipsis whitespace-nowrap"
									>
										{result.media_type == 'movie' ? result.title : result.name}
									</p>
									<p class="text-[13px] word sm:text-[12px] text-color-3 p">
										{result.media_type == 'movie'
											? getLetterRange(result.release_date, 4)
											: getLetterRange(result.first_air_date, 4)}
										&nbsp; &middot; &nbsp;
										{result.media_type == 'movie' ? `Movie` : 'TV'}
									</p>
								</div>
							</div>
						</a>
					</div>
				{/each}
			{/if}
		</div>
		<div class="swiper-progress"></div>
	</div>

	<div class="controls w-[40px] flex flex-col gap-3 text-color-1/30 sm:hidden">
		<button
			aria-label="Slide Next"
			class="w-full h-full rounded-lg center-div bg-color-1/20"
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
			class="w-full h-full rounded-lg center-div bg-color-1/20"
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
