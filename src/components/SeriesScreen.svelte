<script lang="ts">
	import { isOdd } from '$src/lib';
	import { fetchSeasonDetails } from '$src/lib/fetch';
	import { onMount } from 'svelte';

	let { seriesData, tvId }: { seriesData: any; tvId: any } = $props();
	let streamServer = $state('vidcloud');
	let isSeasonListVisible = $state(false);
	let seasonCount = $state(seriesData.last_episode_to_air.season_number);
	let seasonData: any = $state([]);
	let seasonSelect = $state(1);
	let episodeSelect = $state(1);
	let episodeCount = $derived(
		seasonSelect == seriesData.seasons[seriesData.seasons.length - 1].season_number
			? seriesData.last_episode_to_air.episode_number
			: seriesData.seasons.filter(
					(season_filter: any) => season_filter.season_number == seasonSelect
				)[0].episode_count
	);
	onMount(() => {
		episodeSelect = 1;
		seasonSelect = 1;
	});

	$effect(() => {
		if (seriesData) seasonCount = seriesData.last_episode_to_air.season_number;
		if (seasonSelect) episodeSelect = 1;
		const fetchEpisodes = async () => {
			const res = await fetchSeasonDetails(seriesData.id, seasonSelect);
			seasonData = res.episodes;
		};
		fetchEpisodes();
	});
</script>

<div
	class="movie-container-screen h-auto w-full bg-cover px-10 py-5 max-sm:px-0 max-sm:py-0"
	style="background-image: url(https://image.tmdb.org/t/p/w500{seriesData.backdrop_path});"
>
	<div class="inner relative z-[3] h-full w-full">
		<p class="breadcrum mb-5 flex gap-3 text-[0.8rem] max-md:hidden">
			<span>Home</span>
			<span>/</span>
			<span>Movie</span>
			<span>/</span>
			<span class="text-color-1/70">Watching {seriesData.name}</span>
		</p>
		<div
			class="next-container bg-sec flex h-auto w-full overflow-hidden rounded-md backdrop-blur-[10px] max-md:flex-col-reverse max-md:gap-0 max-sm:rounded-none"
		>
			<div class="side h-full w-[25%] pb-3 max-md:w-full">
				<div class="flex items-center gap-2 p-4">
					<div class="text-white">List of Seasons :</div>
					<div
						class="no-scrollbar flex gap-2"
						style="display: flex; flex-wrap: nowrap; width: 100%; height: auto; overflow-x: scroll "
					>
						{#each Array.from({ length: seasonCount }) as _, index}
							<button
								onclick={() => (seasonSelect = index + 1)}
								style="flex: 0 0 auto"
								class={`rounded-md px-2 py-1  ${seasonSelect === index + 1 ? 'bg-color-3 text-main' : 'bg-color-1/10'}`}
							>
								<p>Season {index + 1}</p>
							</button>
						{/each}
					</div>
				</div>
				<p class="mb-4 w-full px-4 text-white">List of Episodes:</p>

				<div class="episode-list max-h-[400px] w-full overflow-y-auto">
					{#if seasonData.length == 0}
						{#each Array.from({ length: episodeCount }) as _, index}
							<button
								onclick={() => (episodeSelect = index + 1)}
								class={`item h-[40px] w-full cursor-pointer px-4  ${episodeSelect === index + 1 ? 'border-l-color-3/90  bg-color-3/30 border-l-4' : isOdd(index + 1) ? 'bg-tet' : 'bg-sec'} flex items-center justify-between gap-2 text-white`}
							>
								<div class="flex items-center gap-2">
									<p>EP {index + 1}:</p>
									<p>Loading...</p>
								</div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									class={`bi bi-play-circle-fill size-4  ${episodeSelect === index + 1 ? 'text-color-3' : 'text-color-1'}`}
									viewBox="0 0 16 16"
								>
									<path
										d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"
									/>
								</svg>
							</button>
						{/each}
					{:else}
						{#each seasonData.filter((item: any) => item.runtime > 0) as item, index}
							<button
								onclick={() => (episodeSelect = index + 1)}
								class={`item h-[40px] w-full cursor-pointer px-4  ${episodeSelect === index + 1 ? 'border-l-color-3/90  bg-color-3/30 border-l-4' : isOdd(index + 1) ? 'bg-tet' : 'bg-sec'} flex items-center justify-between gap-2 text-white`}
							>
								<div class="flex w-full items-center gap-2">
									<p class="whitespace-nowrap">EP {index + 1}:</p>
									<p
										class="w-[200px] overflow-hidden text-left overflow-ellipsis whitespace-nowrap"
									>
										{item.name}
									</p>
								</div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									class={`bi bi-play-circle-fill size-4  ${episodeSelect === index + 1 ? 'text-color-3' : 'text-color-1'}`}
									viewBox="0 0 16 16"
								>
									<path
										d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"
									/>
								</svg>
							</button>
						{/each}
					{/if}
				</div>
			</div>
			<div class="screen bg-sec h-full w-[75%] overflow-hidden max-md:w-full">
				{#if streamServer === 'vidcloud'}
					<iframe
						title="Tv show"
						class="h-[85vh] w-full max-sm:h-[210px]"
						id="playit"
						src={`https://vidlink.pro/tv/${seriesData.id}/${seasonSelect}/${episodeSelect}?primaryColor=ccccff&autoplay=false&iconColor=ccccff&icons=default`}
						allowFullScreen
					></iframe>
				{:else}
					<iframe
						title="Tv show"
						class="h-[85vh] w-full max-sm:h-[210px]"
						id="playit"
						src={`https://vidsrc.cc/v2/embed/tv/${seriesData.id}/${seasonSelect}/${episodeSelect}`}
						allowFullScreen
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
</div>

<!-- 
<div class="movie-container-screen w-full">
	<div class="screen w-full h-[80vh] max-sm:h-[200px] overflow-hidden mb-3 relative">
		{#if hasStartedPlaying}
			<iframe
				title="TV"
				class="w-full h-full"
				id="playit"
				src={`https://vidsrc.cc/v2/embed/tv/${tvId}/${seasonSelect}/${episodeSelect}`}
				allowFullScreen
			></iframe>
		{:else}
			<div
				class="thumbnail w-full h-full relative overflow-hidden bg-cover"
				style={`background-image: url(https://image.tmdb.org/t/p/original${seriesData.backdrop_path});`}
			>
				<div
					class="mask absolute top-0 left-0 w-full h-[100%] bg-gradient-to-t from-main to-[#26262637] flex items-center justify-center"
				>
					<button
						class="w-auto h-auto bg-color-3 rounded-full flex items-center justify-center cursor-pointer"
						onclick={() => (hasStartedPlaying = true)}
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

	<div class="w-full px-7 max-sm:px-4">
		<div
			class="episode-changer-cont relative w-[300px] max-sm:w-full h-[auto] text-[13px] overflow-hidden"
		>
			<button
				class="season-changer w-full absolute z-[3] font-semibold shadow-2xl rounded-t-md h-[50px] flex items-center bg-[#071220] justify-center gap-1 cursor-pointer"
				onclick={() => changeSeasonListVisibilty()}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					class="bi bi-file-play-fill size-5 text-color-3 max-sm:size-4"
					viewBox="0 0 16 16"
				>
					<path
						d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M6 5.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V5.884z"
					/>
				</svg>
				<span>Season {seasonSelect}</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					class="bi bi-caret-down-fill size-3"
					viewBox="0 0 16 16"
				>
					<path
						d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
					/>
				</svg>
			</button>
			<div
				class={`season-list transition-transform z-[2] top-[40px] duration-[0.2s] max-h-[160px] overflow-y-auto ${
					!isSeasonListVisible ? 'translate-y-[-1000px]' : 'translate-y-0'
				} w-[150px] absolute left-[75px] max-sm:left-[calc(50% - 75px)] rounded-b-md round shadow-2xl bg-[#03070c]`}
				onblur={() => changeSeasonListVisibilty()}
			>
				{#each Array.from({ length: seasonCount }) as season, index}
					<button
						class={`m-3 font-medium cursor-buttonointer ${seasonSelect == index + 1 && 'text-color-3'}`}
						onclick={() => (seasonSelect = index + 1)}
					>
						Season {index + 1}
					</button>
				{/each}
			</div>
			<div
				class="episode-list w-full max-h-[250px] min-h-[250px] overflow-y-auto scroller shadow-2xl mt-[50px] bg-[#08182b] rounded-b-md"
				style=" scrollbar-color: white "
			>
				{#each Array.from({ length: episodeCount }) as _, index}
					<button
						type="button"
						aria-label="Play"
						class={`w-full h-[50px] cursor-pointer flex items-center gap-2 text-[11px] px-3  ${
							episodeSelect == index + 1 && 'text-black bg-color-3'
						} `}
						style=" flex: 0 0 auto"
						onclick={() => (episodeSelect = index + 1)}
					>
						<i class="fa-solid fa-circle-play"></i>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							class={`bi bi-play-circle-fill size-4  ${episodeSelect == index + 1 ? 'text-main' : 'text-color-3'}`}
							viewBox="0 0 16 16"
						>
							<path
								d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"
							/>
						</svg>
						Episode {index + 1}
					</button>
				{/each}
			</div>
		</div>
	</div>
</div> -->

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
