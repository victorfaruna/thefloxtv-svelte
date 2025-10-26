<script>
	import '$src/app.css';
	import { page } from '$app/state';
	import { toSentenceCase } from '$src/lib';
	// import Toploader from '$lib/Toploader.svelte';
	import { navigating } from '$app/state';
	//Injecting Vercel's analytics
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	inject({ mode: dev ? 'development' : 'production' });
	//...
	export let host = toSentenceCase(page.url.hostname.split('.')[0]);
	// Redirect to main domain if accessed from a different host
	if (typeof window !== 'undefined' && host !== 'Watchlens' && host != 'Localhost') {
		window.location.href = 'https://watchlens.xyz';
	}
</script>

<svelte:head>
	<title>{host} | Watch Movies and TV Shows online for free</title>
	<meta
		name="description"
		content="Watch free blockbuster movies and binge-worthy series for free! Dive into a wide range of content, from timeless classics to the latest releases. Enjoy easy, hassle-free streaming anytime, anywhere. Start your cinematic adventure now all for free!"
	/>
</svelte:head>
{#if navigating}
	<div class="loading-container bg-color-3 absolute top-0 z-[200] h-[0.5px] w-[100%]"></div>
{/if}

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
			width: 70%;
		}
	}
</style>
