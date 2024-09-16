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
		class="size-[25px] sm:size-[17px] {className}"
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
<div class="cont my-10">
	<div class="mb-5 flex justify-center sm:flex-col gap-5 sm:gap-3 items-center text-[12px]">
		<div class="uppercase text-[25px] sm:text-[17px] font-bold text-white flex gap-1 items-center">
			{@render NetflixLogo('')}
			<p>Watch Netflix</p>
		</div>

		<div class="flex gap-3 sm:gap-1 items-center text-[grey] sm:text-[11px]">
			<button
				aria-label="Today"
				onclick={() => setNetflixType('movie')}
				class={`px-3 py-1 border-[1.5px] rounded-md cursor-pointer active:border-color-3 active:text-color-3 ${
					type == 'movie' ? ' border-color-3 text-color-3' : 'border-color-1/20'
				}`}
			>
				Movie
			</button>
			<button
				aria-label="This Week"
				onclick={() => setNetflixType('tv')}
				class={`px-3 py-1 border-[1.5px] rounded-md cursor-pointer active:border-color-3 active:text-color-3 ${
					type == 'tv' ? ' border-color-3 text-color-3' : 'border-color-1/20'
				}`}
			>
				Series
			</button>
		</div>
	</div>

	<div class="trending-cont mb-[50px] flex sm:flex-col">
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
						<div class="group item w-auto flex relative items-center" style="flex: 0 0 auto">
							<p
								class="group-hover:text-color-3/10 list-number w-auto center-div font-semibold text-[150px] font-[Lato,Lato-fallback,Arial,sans-serif] text-[#ffffff1e] sm:text-[100px]"
							>
								{index + 1}
							</p>
							<div class=" w-[320px] h-auto sm:w-[170px] translate-x-[-10px] overflow-hidden">
								<div class="image-container w-full h-auto overflow-hidden relative">
									<div
										class="filter w-full h-full absolute z-30 bg-gradient-to-r from-main/40 to-[transparent] flex items-center justify-center"
									></div>
									{@render NetflixLogo('absolute top-[10px] left-[10px] z-[40]')}
									<img
										loading="lazy"
										class="object-cover rounded-md w-full h-auto bg-color-1/20 min-h-[180px] sm:min-h-[95.5px]"
										src={`https://themoviedb.org/t/p/w500${
											result?.images?.backdrops[0]?.file_path ?? result.backdrop_path
										}`}
										alt=""
									/>
								</div>
								<p
									class="text-[14px] my-1 sm:text-[12px] text-[lightgrey] w-full whitespace-nowrap overflow-ellipsis overflow-hidden"
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
