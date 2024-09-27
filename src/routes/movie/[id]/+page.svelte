<script lang="ts">
	import { page } from '$app/stores';
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

<main class="main-container w-full">
	<MovieScreen {movieData} movieId={id} />
	<section class="w-full h-auto p-7 mt-4 sm:p-4">
		<div class="movie-details w-full h-auto flex gap-3">
			<div
				class="small-image-container w-[250px] h-[270px] sm:w-[120px] sm:h-[130px] overflow-hidden"
			>
				<img
					class="w-full h-full object-cover"
					src={`https://image.tmdb.org/t/p/w220_and_h330_face${movieData.poster_path}`}
					width={220}
					height={330}
					alt="Movie"
				/>
			</div>
			<div
				class="title-card text-semibold text-slate-200 w-full pr-[10%] sm:pr-5 flex flex-col gap-3"
			>
				<p class="text-[30px] font-bold sm:text-[25px]">
					{movieData.title}
				</p>
				<div class="quick-info flex gap-3 flex-wrap items-center text-gray-500">
					<span
						class="w-auto px-[8px] py-[0.5px] text-[13px] sm:text-[11px] font-[600] text-gray-500 outline outline-1 outline-color-3 rounded-sm"
					>
						HD
					</span>
					{#each movieData.genres.slice(0, 3) as genre}
						<span class="text-[13px] sm:text-[11px]">
							{genre.name} &middot;
						</span>
					{/each}
					<span class="text-[17px] sm:text-[11px] text-color-3">
						{getLetterRange(movieData.release_date, 4)}
					</span>
				</div>
				<p class="description text-[17px] sm:text-[11px]">
					{getWordRange(movieData.overview, 25)}
				</p>
			</div>
		</div>
		{''}
		<div class="cast-container w-full h-auto mt-6 relative overflow-hidden">
			<p class="text-[30px] font-bold sm:text-[20px] text-white mb-4">Cast</p>
			{' '}
			<div
				class="scroll-container no-scrollbar"
				style="display: flex; flex-wrap: nowrap; width: 100%; height: auto; overflow-x: scroll "
			>
				{#each movieData.credits.cast.slice(0, 7) as cast}
					<div
						class="item w-auto h-auto mr-[10px] flex flex-col items-center relative gap-3 sm:mr-[8px]"
						style="flex: 0 0 auto"
					>
						<img
							class="w-[130px] h-[130px] sm:w-[100px] sm:h-[100px] rounded-2xl object-cover"
							src={cast.profile_path == null
								? '/images/null-avatar.png'
								: `https://media.themoviedb.org/t/p/w240_and_h266_face${cast.profile_path}`}
							width={130}
							height={170}
							loading="lazy"
							alt="cast"
						/>
						<p class="text-gray-300 text-[14px] sm:text-[12px]">{getWordRange(cast.name, 2)}</p>
					</div>
				{/each}
				<a target="_blank" href={`https://www.themoviedb.org/movie/${movieData.id}/cast`}>
					<div
						class="w-[200px] h-[130px] sm:h-[100px] flex gap-2 items-center justify-center text-color-3 text-[12px]"
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
