<script lang="ts">
	import Swiper from 'swiper';
	import 'swiper/css';
	import 'swiper/css/navigation';
	import 'swiper/css/pagination';
	import { getLetterRange, getWordRange } from '$src/lib';
	import { Autoplay, Navigation, Pagination } from 'swiper/modules';
	import MovieLogo from '$components/MovieLogo.svelte';
	//
	let { mainData }: any = $props();
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
			}
		});
		return () => {
			swiper.destroy();
			window.removeEventListener('resize', () => (width = window.innerWidth));
		};
	});
</script>

<div class="carousel-cont w-full h-screen relative sm:h-[50vh]">
	<div bind:this={swiperComponent} class="swiper carousel w-full h-full">
		<div class="swiper-wrapper">
			{#each mainData.slice(0, 10) as result}
				<div class="swiper-slide carousel-item relative">
					<div
						class="mask w-full h-[60%] absolute bg-gradient-to-t from-main via-transparent to-transparent left-0 bottom-0 z-[3]"
					></div>
					<div
						class="filter w-full h-full absolute bg-gradient-to-r from-main via-main/50 to-transparent left-0 bottom-0 z-[3]"
					></div>
					<img
						src={width > 1000
							? `https://image.tmdb.org/t/p/original${result.backdrop_path}`
							: `https://image.tmdb.org/t/p/w1280${result.backdrop_path}`}
						alt="Slide"
						class="w-full h-[120vh] sm:h-full my-0 mx-auto object-cover"
					/>
					<div
						class="text w-[60%] h-auto text-sm overflow-hidden absolute bottom-0 pb-[70px] pl-[3%] left-0 z-[5] sm:w-full sm:pb-[50px] sm:text-center"
					>
						<MovieLogo
							movieId={result.id}
							mediaType={result.media_type}
							movieTitle={result.name ? result.name : result.title}
						/>

						<div
							class="info flex items-center font-[500] sm:justify-center gap-6 sm:gap-3 mb-3"
							style="text-shadow: 1px 1px 1px black"
						>
							<span>
								{result.media_type === 'movie'
									? getLetterRange(result.release_date, 4)
									: getLetterRange(result.first_air_date, 4)}
							</span>
							<span
								class="certification center-div px-[7px] py-[0.5px] rounded-2xl font-bold text-[11px] border"
								>HD</span
							>
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
						<p class="desc sm:hidden mr-6 sm:mr-0 mb-10 text-color-1/90 leading-6">
							{result.overview.split(/\s+/).length > 45
								? getWordRange(result.overview, 45)
								: result.overview}
						</p>
						<div class="buttons flex gap-5 flex-wrap sm:justify-center font-[500]">
							<a href={result.media_type === 'movie' ? `/movies/${result.id}` : `/tv/${result.id}`}>
								<button
									class="view-btn w-[160px] h-[43px] border border-color-3 text-color-3 rounded-[1.5rem] center-div gap-2"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-4"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
										/>
									</svg>
									Watch
								</button>
							</a>
							<button class="view-btn center-div gap-2" style="background: none">
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
										d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
									/>
								</svg>

								Bookmark
							</button>
						</div>
					</div>

					<div
						class="small-banner-slider w-[25%] absolute my-[50px] mx-[3%] right-0 bottom-0 z-[5] flex items-center justify-center sm:hidden"
					>
						<div class="item w-[170px]">
							<img
								class="w-full rounded-lg"
								src={`https://themoviedb.org/t/p/w220_and_h330_face${result.poster_path}`}
								alt={''}
							/>
							<p
								class="active title text-center w-full text-ellipsis overflow-hidden whitespace-nowrap"
							>
								{result.media_type === 'movie' ? result.title : result.name}
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
