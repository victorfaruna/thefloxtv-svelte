<script lang="ts">
	import { page } from '$app/stores';
	import Header from '$components/Header.svelte';
	import MovieScreen from '$components/MovieScreen.svelte';
	import { getLetterRange, getWordRange } from '$src/lib';
	let { data } = $props();
	let movieData = $state(data.movieData);
	let id = $state($page.params.id);

	$effect(() => {
		if ($page.params.id) {
			movieData = data.movieData;
		}
	});
</script>

<Header />
<main class="main-container w-full">
	<MovieScreen {movieData} movieId={id} />
	<section class="mt-4 h-auto w-full p-7 max-sm:p-4">
		<div class="movie-details flex h-auto w-full gap-3">
			<div
				class="small-image-container h-[270px] w-[250px] overflow-hidden max-sm:h-[130px] max-sm:w-[120px]"
			>
				<img
					class="h-full w-full object-cover"
					src={`https://image.tmdb.org/t/p/w220_and_h330_face${movieData.poster_path}`}
					width={220}
					height={330}
					alt="Movie"
				/>
			</div>
			<div
				class="title-card text-semibold flex w-full flex-col gap-3 pr-[10%] text-slate-200 max-sm:pr-5"
			>
				<p class="text-[30px] font-bold max-sm:text-[25px]">
					{movieData.title}
				</p>
				<div class="quick-info flex flex-wrap items-center gap-3 text-gray-500">
					<span
						class="outline-color-3 w-auto rounded-sm px-[8px] py-[0.5px] text-[13px] font-[600] text-gray-500 outline outline-1 max-sm:text-[11px]"
					>
						HD
					</span>
					{#each movieData.genres.slice(0, 3) as genre}
						<span class="text-[13px] max-sm:text-[11px]">
							{genre.name}
						</span>
						&middot;
					{/each}
					<span class="text-color-3 text-[17px] max-sm:text-[11px]">
						{getLetterRange(movieData.release_date, 4)}
					</span>
				</div>
				<p class="description text-[17px] max-sm:text-[11px]">
					{getWordRange(movieData.overview, 25)}
				</p>
			</div>
		</div>
		{''}
		<div class="cast-container relative mt-6 h-auto w-full overflow-hidden">
			<p class="mb-4 text-[30px] font-bold text-white max-sm:text-[20px]">Cast</p>
			{' '}
			<div
				class="scroll-container no-scrollbar"
				style="display: flex; flex-wrap: nowrap; width: 100%; height: auto; overflow-x: scroll "
			>
				{#each movieData.credits.cast.slice(0, 7) as cast}
					<div
						class="item relative mr-[10px] flex h-auto w-auto flex-col items-center gap-3 max-sm:mr-[8px]"
						style="flex: 0 0 auto"
					>
						<img
							class="h-[130px] w-[130px] rounded-2xl object-cover max-sm:h-[100px] max-sm:w-[100px]"
							src={cast.profile_path == null
								? '/images/null-avatar.png'
								: `https://media.themoviedb.org/t/p/w240_and_h266_face${cast.profile_path}`}
							width={130}
							height={170}
							loading="lazy"
							alt="cast"
						/>
						<p class="text-[14px] text-gray-300 max-sm:text-[12px]">{getWordRange(cast.name, 2)}</p>
					</div>
				{/each}
				<a target="_blank" href={`https://www.themoviedb.org/movie/${movieData.id}/cast`}>
					<div
						class="text-color-3 flex h-[130px] w-[200px] items-center justify-center gap-2 text-[12px] max-sm:h-[100px]"
					>
						<p>View&nbsp;All</p>
						<i class="fa-regular fa-arrow-right"></i>
					</div>
				</a>
			</div>
		</div>

		<!-- <MovieTrailers
			trailers={movieData.videos}
			movieTitle={movieData.title}
			movieBanner={movieData.images.backdrops[0]?.file_path ?? movieData.backdrop_path}
		/> -->
	</section>
</main>

<style>
	.scroll-container::after {
		content: '';
		position: absolute;
		height: 100%;
		right: 0;
		top: 0;
		z-index: 2;
		box-shadow: 0 0 90px 90px rgb(var(--bg-color-1));
	}
</style>
