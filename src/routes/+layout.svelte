<script>
	import Header from '$components/Header.svelte';
	import '$src/app.css';
	import { page } from '$app/stores';
	import { toSentenceCase } from '$src/lib';
	// import Toploader from '$lib/Toploader.svelte';
	import { navigating } from '$app/stores';
	export let host = toSentenceCase($page.url.hostname.split('.')[0]);
</script>

<svelte:head>
	<title>{host} | Watch Movies and TV Shows online for free</title>
	<meta
		name="description"
		content="Watch free blockbuster movies and binge-worthy series for free! Dive into a wide range of content, from timeless classics to the latest releases. Enjoy easy, hassle-free streaming anytime, anywhere. Start your cinematic adventure now all for free!"
	/>
</svelte:head>
{#if $navigating}
	<div class="loading-container absolute top-0 z-[200] w-full h-[0.5px] bg-color-3"></div>
{/if}
<Header />
<div>
	<slot />
</div>

<style>
	.loading-container {
		animation: stult 2s ease-out;
	}

	@keyframes stult {
		0% {
			width: 0;
		}
		90% {
			width: 100%;
		}
	}
</style>
