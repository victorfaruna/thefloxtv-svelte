<script lang="ts">
	import { formatDate, getLetterRange, isOdd } from '$src/lib';

	let { movieData, movieId }: { movieData: any; movieId: any } = $props();
	let hasStartedPlaying = $state(false);
	let setHasStartedPlaying = (value: boolean) => {
		hasStartedPlaying = value;
	};
</script>

<div
	class="movie-container-screen w-full h-auto pt-[90px] sm:pt-[60px] py-5 px-10 bg-cover sm:px-0"
	style="background-image: url(https://image.tmdb.org/t/p/w500{movieData.backdrop_path});"
>
	<div class="inner w-full h-full relative z-[3]">
		<p class="breadcrum flex gap-3 text-[0.8rem] mb-5 md:hidden">
			<span>Home</span>
			<span>/</span>
			<span>Movie</span>
			<span>/</span>
			<span class="text-color-1/70">Watching {movieData.title}</span>
		</p>
		<div
			class="next-container w-full h-auto rounded-md sm:rounded-none overflow-hidden backdrop-blur-[10px] bg-color-1/20 flex gap-2 md:flex-col-reverse md:gap-0"
		>
			<div class="side w-[25%] h-full pb-3 md:w-full">
				<p class="w-full p-4 text-white">List of Movie Files:</p>
				<ol class="list-outside" type="a">
					<li
						class={`item cursor-pointer w-full px-4 h-[40px] bg-color-3/10 border-l-4 text-white border-l-color-3/80 flex items-center justify-between gap-2`}
					>
						<div class="flex gap-2 items-center">
							<p>1.</p>
							<p>
								{movieData.title} -
								{getLetterRange(movieData.release_date, 4)}
							</p>
						</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							class="bi bi-play-circle-fill size-4 text-color-3"
							viewBox="0 0 16 16"
						>
							<path
								d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"
							/>
						</svg>
					</li>
				</ol>
			</div>
			<div class="screen w-[75%] bg-sec h-full overflow-hidden md:w-full">
				<iframe
					title="Movie"
					class="w-full h-[85vh] sm:h-[230px]"
					id="playit"
					src={`https://vidlink.pro/movie/${movieId}?primaryColor=ffdd95&autoplay=false&iconColor=ffdd95&poster=false`}
					allowFullScreen
				></iframe>
				<div class="rest w-full h-auto p-4 overflow-hidden">
					<div class="w-full h-auto bg-main/50 rounded-md flex overflow-hidden">
						<div
							class="left bg-color-3 w-[200px] min-h-[100px] flex items-center text-center text-tet font-[500]"
						>
							If current server doesn't work please try other servers beside.
						</div>
						<div class="left bg-transparent w-full h-full"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- <div class="screen w-full h-[80vh] sm:h-[200px] overflow-hidden mb-3 relative">
		{#if hasStartedPlaying}
			<iframe
				title="Movie"
				class="w-full h-full"
				id="playit"
				src={`https://vidlink.pro/movie/${movieId}?primaryColor=000&autoplay=false`}
				allowFullScreen
			></iframe>
		{:else}
			<div
				class="thumbnail w-full h-full relative overflow-hidden bg-cover"
				style="background-image: url(https://image.tmdb.org/t/p/original{movieData.backdrop_path});"
			>
				<div
					class="mask absolute top-0 left-0 w-full h-[100%] bg-gradient-to-t from-main to-[#26262637] flex items-center justify-center"
				>
					<button
						aria-label="Play"
						class="w-auto h-auto rounded-full bg-color-3 flex items-center justify-center cursor-pointer"
						onclick={() => setHasStartedPlaying(true)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							class="bi bi-play-circle-fill size-[60px] sm:size-[45px] text-main"
							viewBox="0 0 16 16"
						>
							<path
								d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"
							/>
						</svg>
					</button>
				</div>
			</div>
		{/if} 
	</div>
-->
</div>

<style>
	.movie-container-screen {
		position: relative;
	}
	.movie-container-screen::before {
		content: '';
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 2;
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(var(--bg-color-1), 0.6);
		backdrop-filter: blur(40px);
	}
</style>
