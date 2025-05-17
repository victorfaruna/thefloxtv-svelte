<script lang="ts">
	let { movieLogo, movieTitle }: any = $props();
</script>

{#if movieLogo}
	<img
		class="movie-logo mb-[40px] w-[180px] max-sm:mx-auto max-sm:my-0 max-sm:mb-[20px] max-sm:w-[120px]"
		src={`https://themoviedb.org/t/p/w185/${movieLogo}`}
		alt="Movie Logo"
		width={160}
		height={80}
	/>
	<!-- <p
		class=" font-bold mb-[40px] max-sm:my-0 max-sm:mx-auto max-sm:mb-[13px] text-[1rem] hidden max-sm:block"
		style="text-shadow: 0 1px 2px #000;"
	>
		{movieTitle.toUpperCase()}
	</p> -->
{:else}
	<p
		class=" mb-[40px] text-[1rem] font-bold max-sm:mx-auto max-sm:my-0 max-sm:mb-[13px]"
		style="text-shadow: 0 1px 2px #000;"
	>
		{movieTitle.toUpperCase()}
	</p>
{/if}
