<script lang="ts">
	import { onMount } from 'svelte';

	export let movieId: string;
	export let mediaType: string;
	export let movieTitle: string;

	let movieLogoData: string;

	async function getMovieLogo() {
		const res = await fetch(
			`https://api.themoviedb.org/3/${mediaType}/${movieId}/images?include_image_language=en&api_key=c19b8e28dc3c9d900ceb4696bf2d247c`,
			{ cache: 'no-cache' }
		);
		const data = await res.json();
		movieLogoData = data.logos[0] ? data.logos[0].file_path : '';
	}
	onMount(() => getMovieLogo());
</script>

{#if movieLogoData}
	<img
		class="movie-logo w-[180px] mb-[40px] sm:w-[120px] sm:my-0 sm:mx-auto sm:mb-[20px]"
		src={`https://themoviedb.org/t/p/w500/${movieLogoData}`}
		alt="Movie Logo"
		width={160}
		height={80}
	/>
{:else}
	<p class="text-[20px] font-bold mb-[40px] sm:w-[120px] sm:my-0 sm:mx-auto sm:mb-[20px]">
		{movieTitle.toUpperCase()}
	</p>
{/if}
