<script lang="ts">
	let { movieData, movieId }: { movieData: any; movieId: any } = $props();
	let hasStartedPlaying = $state(false);
	let setHasStartedPlaying = (value: boolean) => {
		hasStartedPlaying = value;
	};
</script>

<div class="movie-container-screen w-full">
	<div class="screen w-full h-[80vh] sm:h-[200px] overflow-hidden mb-3 relative">
		{#if hasStartedPlaying}
			<iframe
				title="Movie"
				class="w-full h-full"
				id="playit"
				src={`https://vidsrc.cc/v2/embed/movie/${movieId}`}
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
						class="w-auto h-auto rounded-full flex items-center justify-center cursor-pointer"
						onclick={() => setHasStartedPlaying(true)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							class="bi bi-play-circle-fill size-[60px] sm:size-[45px] text-color-3"
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
</div>
