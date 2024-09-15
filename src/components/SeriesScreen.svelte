<script lang="ts">
	import { onMount } from 'svelte';

	let { seriesData, tvId }: { seriesData: any; tvId: any } = $props();
	let collapseRef;
	let isSeasonListVisible = $state(false);
	let seasonCount = seriesData.last_episode_to_air.season_number;
	let hasStartedPlaying = $state(false);
	let seasonSelect = $state(seasonCount);
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
	});

	$effect(() => {
		if (seasonSelect) episodeSelect = 1;
	});

	function changeSeasonListVisibilty() {
		isSeasonListVisible = !isSeasonListVisible;
	}
</script>

<div class="movie-container-screen w-full">
	<div class="screen w-full h-[80vh] sm:h-[200px] overflow-hidden mb-3 relative">
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

	<div class="w-full px-7 sm:px-4">
		<div
			class="episode-changer-cont relative w-[300px] sm:w-full h-[auto] text-[13px] overflow-hidden"
		>
			<button
				class="season-changer w-full absolute z-[3] font-semibold shadow-2xl rounded-t-md h-[50px] flex items-center bg-[#071220] justify-center gap-1 cursor-pointer"
				onclick={() => changeSeasonListVisibilty()}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					class="bi bi-file-play-fill size-5 text-color-3 sm:size-4"
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
				} w-[150px] absolute left-[75px] sm:left-[calc(50% - 75px)] rounded-b-md round shadow-2xl bg-[#03070c]`}
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
</div>
