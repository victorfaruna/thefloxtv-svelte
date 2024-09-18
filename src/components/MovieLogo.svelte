<script lang="ts">
	let { movieLogo, movieTitle }: any = $props();
</script>

{#if movieLogo}
	<img
		class="movie-logo w-[180px] mb-[40px] sm:w-[120px] sm:my-0 sm:mx-auto sm:mb-[20px]"
		src={`https://themoviedb.org/t/p/w185/${movieLogo}`}
		alt="Movie Logo"
		width={160}
		height={80}
	/>
	<!-- <p
		class=" font-bold mb-[40px] sm:my-0 sm:mx-auto sm:mb-[13px] text-[1rem] hidden sm:block"
		style="text-shadow: 0 1px 2px #000;"
	>
		{movieTitle.toUpperCase()}
	</p> -->
{:else}
	<p
		class=" font-bold mb-[40px] sm:my-0 sm:mx-auto sm:mb-[13px] text-[1rem]"
		style="text-shadow: 0 1px 2px #000;"
	>
		{movieTitle.toUpperCase()}
	</p>
{/if}
