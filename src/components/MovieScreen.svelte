<script lang="ts">
	import { getLetterRange } from '$src/lib';

	let { movieData, movieId }: { movieData: any; movieId: any } = $props();
	let streamServer = $state('vidcloud');
</script>

<div
	class="movie-container-screen h-auto w-full bg-cover px-10 py-5 max-sm:px-0 max-sm:py-0"
	style="background-image: url(https://image.tmdb.org/t/p/w500{movieData.backdrop_path});"
>
	<div class="inner relative z-[3] h-full w-full">
		<p class="breadcrum mb-5 flex gap-3 text-[0.8rem] max-md:hidden">
			<a href="/">Home</a>
			<span>/</span>
			<a href="/">Movie</a>
			<span>/</span>
			<span class="text-color-1/70">Watching {movieData.title}</span>
		</p>
		<div
			class="next-container bg-sec flex h-auto w-full gap-2 overflow-hidden rounded-md backdrop-blur-[10px] max-md:flex-col-reverse max-md:gap-0 max-sm:rounded-none"
		>
			<div class="side h-full w-[25%] pb-3 max-md:w-full">
				<p class="w-full p-4 text-white">List of Movie Files:</p>
				<ol class="list-outside" type="a">
					<li
						class={`item bg-color-3/10 border-l-color-3/80 flex h-[40px] w-full cursor-pointer items-center justify-between gap-2 border-l-4 px-4 text-white`}
					>
						<div class="flex items-center gap-2">
							<p>1.</p>
							<p>
								{movieData.title} -
								{getLetterRange(movieData.release_date, 4)}
							</p>
						</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							class="bi bi-play-circle-fill text-color-3 size-4"
							viewBox="0 0 16 16"
						>
							<path
								d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"
							/>
						</svg>
					</li>
				</ol>
			</div>
			<div class="screen bg-sec h-full w-[75%] overflow-hidden max-md:w-full">
				{#if streamServer === 'vidcloud'}
					<iframe
						title="Movie"
						class="h-[85vh] w-full max-sm:h-[210px]"
						id="playit"
						src={`https://vidlink.pro/movie/${movieId}?primaryColor=000&autoplay=false`}
						allowFullScreen
						sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
						referrerpolicy="no-referrer"
						loading="lazy"
					></iframe>
				{:else}
					<iframe
						title="Movie"
						class="h-[85vh] w-full max-sm:h-[210px]"
						id="playit"
						src={`https://vidsrc.cc/v2/embed/movie/${movieData.id}`}
						allowFullScreen
						sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
						referrerpolicy="no-referrer"
						loading="lazy"
					></iframe>
				{/if}
				<div
					class="rest border-b-color-2/10 h-auto w-full overflow-hidden border-b border-dotted p-4"
				>
					<div
						class="bg-main/20 flex h-auto w-full items-center overflow-hidden rounded-md px-5 max-md:rounded-none"
					>
						<div class="left flex h-[40px] w-full items-center gap-3 bg-transparent">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-file-earmark-play-fill"
								viewBox="0 0 16 16"
							>
								<path
									d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M6 6.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V6.884z"
								/>
							</svg>
							<p>Source :</p>
							<div class="options flex gap-2">
								<button
									class={`rounded-md p-1 px-2 ${streamServer === 'vidcloud' ? 'bg-color-3 text-main' : 'bg-color-1/10'}`}
									onclick={() => (streamServer = 'vidcloud')}>Vidcloud</button
								>
								<button
									class={`rounded-md p-1  px-2 ${streamServer === 'vidsrc' ? 'bg-color-3 text-main' : 'bg-color-1/10'}`}
									onclick={() => (streamServer = 'vidsrc')}>Vidsrc</button
								>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- <div class="screen w-full h-[80vh] max-sm:h-[200px] overflow-hidden mb-3 relative">
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
							class="bi bi-play-circle-fill size-[60px] max-sm:size-[45px] text-main"
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
