<script lang="ts">
	import { fetchNetflix } from '$src/lib/fetch';
	import { onMount } from 'svelte';
	import LoadNetflix from './loading/LoadNetflix.svelte';

	//Page props..
	let netflixData: any = $state([]);
	let type = $state('movie');
	let data: any = $state([]);
	let isLoading = $state(true);

	onMount(async () => {
		const [newDataMovie, newDataTv] = await Promise.all([
			fetchNetflix('movie', true),
			fetchNetflix('tv', true)
		]);
		netflixData = { movie: newDataMovie, tv: newDataTv };
		data = netflixData.movie;
		isLoading = false;
	});

	const setNetflixType = (newType: any) => {
		if (newType == 'tv') {
			data = netflixData.tv;
			type = newType;
		} else {
			data = netflixData.movie;
			type = newType;
		}
	};
</script>

{#snippet NetflixLogo(className: string = '')}
	<svg
		class="size-[25px] max-sm:size-[17px] {className}"
		viewBox="124.528 16 262.944 480"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		><linearGradient
			id="a"
			gradientUnits="userSpaceOnUse"
			x1="108.142"
			x2="176.518"
			y1="240.643"
			y2="189.038"
			><stop offset="0" stop-color="#c20000" stop-opacity="0" /><stop
				offset="1"
				stop-color="#9d0000"
			/></linearGradient
		><linearGradient
			id="b"
			x1="400.786"
			x2="338.861"
			xlink:href="#a"
			y1="312.035"
			y2="337.837"
		/><path
			d="m216.398 16h-91.87v480c30.128-7.135 61.601-10.708 91.87-12.052z"
			fill="#c20000"
		/><path
			d="m216.398 16h-91.87v367.267c30.128-7.135 61.601-10.707 91.87-12.051z"
			fill="url(#a)"
		/><path
			d="m387.472 496v-480h-91.87v468.904c53.636 3.416 91.87 11.096 91.87 11.096z"
			fill="#c20000"
		/><path
			d="m387.472 496v-318.555h-91.87v307.459c53.636 3.416 91.87 11.096 91.87 11.096z"
			fill="url(#b)"
		/><path
			d="m387.472 496-171.074-480h-91.87l167.03 468.655c55.75 3.276 95.914 11.345 95.914 11.345z"
			fill="#fa0000"
		/>
	</svg>
{/snippet}
<div class="cont mx-auto my-10 max-w-[1900px] px-3 lg:px-6">
	<div class="mb-5 flex items-center justify-center gap-5 text-[12px] max-sm:flex-col max-sm:gap-3">
		<div
			class="flex items-center gap-1 text-[25px] font-bold text-white uppercase max-sm:text-[17px]"
		>
			{@render NetflixLogo('')}
			<p>Watch Netflix</p>
		</div>

		<div class="flex items-center gap-3 text-[grey] max-sm:gap-1 max-sm:text-[11px]">
			<button
				aria-label="Today"
				onclick={() => setNetflixType('movie')}
				class={`active:border-color-3 active:text-color-3 cursor-pointer rounded-md border-[1.5px] px-3 py-1 ${
					type == 'movie' ? ' border-color-3 text-color-3' : 'border-color-1/20'
				}`}
			>
				Movie
			</button>
			<button
				aria-label="This Week"
				onclick={() => setNetflixType('tv')}
				class={`active:border-color-3 active:text-color-3 cursor-pointer rounded-md border-[1.5px] px-3 py-1 ${
					type == 'tv' ? ' border-color-3 text-color-3' : 'border-color-1/20'
				}`}
			>
				Series
			</button>
		</div>
	</div>

	<div class="trending-cont mb-[50px] flex max-sm:flex-col">
		<div
			class="scroll-container no-scrollbar"
			style="display: flex; flex-wrap: nowrap; width: 100%; height: auto; overflow-x: auto;"
		>
			{#if isLoading || data.length == 0}
				<LoadNetflix />
			{:else}
				{#each data as result, index}
					<a
						data-sveltekit-preload-data
						href={result.media_type == 'movie' ? `/movie/${result.id}` : `/tv/${result.id}`}
					>
						<div class="group item relative flex w-auto items-center" style="flex: 0 0 auto">
							<p
								class="group-hover:text-color-3/10 list-number center-div w-auto font-[Lato,Lato-fallback,Arial,sans-serif] text-[150px] font-semibold text-[#ffffff1e] max-sm:text-[100px]"
							>
								{index + 1}
							</p>
							<div class=" h-auto w-[320px] translate-x-[-10px] overflow-hidden max-sm:w-[170px]">
								<div class="image-container relative h-auto w-full overflow-hidden">
									<div
										class="from-main/40 absolute z-30 flex h-full w-full items-center justify-center bg-gradient-to-r to-[transparent] filter"
									></div>
									{@render NetflixLogo('absolute top-[10px] left-[10px] z-[40]')}
									<img
										loading="lazy"
										class="bg-color-1/5 h-auto min-h-[180px] w-full rounded-md object-cover max-sm:min-h-[95.5px]"
										src={`https://themoviedb.org/t/p/w500${
											result?.images?.backdrops[0]?.file_path || result.backdrop_path
										}`}
										alt=""
									/>
								</div>
								<p
									class="text-color-1 my-1 w-full overflow-hidden text-[14px] overflow-ellipsis whitespace-nowrap max-sm:text-[12px]"
								>
									{type == 'movie' ? result.title : result.name}
								</p>
							</div>
						</div>
					</a>
				{/each}
			{/if}
		</div>
	</div>
</div>
