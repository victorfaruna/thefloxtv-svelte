<script lang="ts">
	import Swiper from 'swiper';
	import 'swiper/css';
	import 'swiper/css/navigation';
	import 'swiper/css/pagination';
	import { getLetterRange, getWordRange } from '$src/lib';
	import { Autoplay, Navigation, Pagination } from 'swiper/modules';
	let isLoading = $state(false);
	let { trendingData }: any = $props();

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
			pagination: {
				el: '.swiper-progress',
				type: 'progressbar'
			},
			spaceBetween: 10,
			slidesPerView: width < 800 ? 1 : width < 1200 ? 2 : 3,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false
			}
		});
		return () => {
			swiper.destroy();
			window.removeEventListener('resize', () => (width = window.innerWidth));
		};
	});

	//   autoplay={{
	//     delay: 3000,
	//     disableOnInteraction: false,
	//   }}
	//   slidesPerView={screenSize[0] < 800 ? 1 : screenSize[0] < 1200 ? 2 : 3}
	//   pagination={{
	//     el: ".swiper-progress",
	//     type: "progressbar",
	//   }}
	//   effect={"autoplay"}
	//   spaceBetween={10}
	//   modules={[Autoplay, Pagination]}
</script>

<div class="text-center my-5 mb-3 text-[13px] flex gap-2 justify-center items-center">
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
			d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
		/>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
		/>
	</svg>
	<p>For Your</p>
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
			d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
		/>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
		/>
	</svg>
</div>
<div class="w-full sm:px-3">
	<div bind:this={swiperComponent} class="swiper w-full h-[220px] sm:h-[185px]">
		<div class="swiper-wrapper">
			{#if isLoading}
				Loading
			{:else}
				{#each trendingData.slice(0, 9) as result}
					<div class="swiper-slide p-2 relative overflow-hidden">
						<a href={result.media_type == 'movie' ? `/movies/${result.id}` : `/tv/${result.id}`}>
							<div
								class="a z-40 w-[150px] sm:w-[130px] h-[45px] sm:h-[40px] shadow-md bg-gray-100 absolute top-[0] right-[0] rounded-bl-2xl rounded-tr-xl text-[16px] sm:text-[14px] font-semibold text-slate-700 flex items-center justify-center"
							>
								Trending Today
							</div>
							<div
								class="inner w-full h-[95%] relative p-0 rounded-xl"
								style="background-Image: url(https://image.tmdb.org/t/p/w500{result.backdrop_path}); background-size: cover; "
							>
								<div
									class="mask w-[100%] h-full absolute top-0 left-0 bottom-0 right-0 z-20 bg-gradient-to-t from-main via-main/50 to-[transparent]"
								></div>
								<div class="absolute bottom-4 left-4 z-30">
									<p class="text-[20px] font-semibold text-gray-300 uppercase">
										{result.media_type == 'movie'
											? getWordRange(result.title, 3)
											: getWordRange(result.name, 3)}
									</p>
									<p class="text-[13px] font-[500] word sm:text-[12px] text-color-3">
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
</div>
