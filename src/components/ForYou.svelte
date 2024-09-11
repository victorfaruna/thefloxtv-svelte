<script lang="ts">
	import { getLetterRange, getWordRange } from '$src/lib';
	import { fetchTrending } from '$src/lib/fetch';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	let SplideComp: any;
</script>

<div>
	<p class="text-center mb-3 text-[13px]">
		<i class="bi bi-fire"></i> For You <i class="bi bi-fire"></i>
	</p>
	<div class="w-full sm:px-3">
		<div class="swiper w-full h-[220px] sm:h-[185px]">
			<Splide
				options={{
					rewind: true,
					width: 800,
					gap: '1rem'
				}}
			>
				{#await fetchTrending('day') then data}
					{#each data as result}
						<SplideSlide class=" w-full h-[220px] sm:h-[185px] relative">
							<div class=" w-full h-auto p-2">
								<a
									href={result.media_type == 'movie' ? `/movies/${result.id}` : `/tv/${result.id}`}
								>
									<div
										class="a z-40 w-[150px] sm:w-[130px] h-[45px] sm:h-[40px] shadow-md bg-gray-100 absolute top-[0] right-[0] rounded-bl-2xl rounded-tr-xl text-[16px] sm:text-[14px] font-semibold text-slate-700 flex items-center justify-center"
									>
										Trending Today
									</div>
									<div
										class="inner w-full h-[220px] relative p-0 rounded-xl"
										style="background-image: url(https://image.tmdb.org/t/p/w500{result.backdrop_path}); background-size: 'cover'; background-position: center; background-size: cover;"
									>
										<div
											class="mask w-[100%] h-full absolute top-0 left-0 bottom-0 right-0 z-20 bg-gradient-to-t from-main via-[#1f1b2989] to-[transparent]"
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
						</SplideSlide>
					{/each}
				{/await}
			</Splide>
		</div>
	</div>
</div>
