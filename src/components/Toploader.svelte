<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import type { Tweened } from 'svelte/motion';

	let loading = false;
	let progress: Tweened<number> =
		typeof window !== 'undefined'
			? tweened(0, {
					duration: 500,
					easing: cubicOut
				})
			: tweened(0);

	// Function to handle progress increase
	const startLoading = () => {
		progress.set(30); // Initial load
		loading = true;

		// Simulate progress increment over time
		const interval = setInterval(() => {
			progress.update((n) => (n < 90 ? n + 5 : n));
		}, 300);

		return () => clearInterval(interval);
	};

	// Complete progress on route load end
	const finishLoading = () => {
		progress.set(100);
		setTimeout(() => {
			progress.set(0);
			loading = false;
		}, 500); // Fade out
	};

	onMount(() => {
		// Subscribe to page start/end events
		window.addEventListener('sveltekit:navigation-start', startLoading);
		window.addEventListener('sveltekit:navigation-end', finishLoading);
	});

	// onDestroy(() => {
	// 	window.removeEventListener('sveltekit:navigation-start', startLoading);
	// 	window.removeEventListener('sveltekit:navigation-end', finishLoading);
	// });
</script>

<div class="loader" style="width: {progress}%; opacity: {loading ? 1 : 0};"></div>

<style>
	.loader {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 4px;
		background-color: var(--primary-color, #00d1b2);
		z-index: 9999;
		transform-origin: left;
		transition: opacity 0.5s ease;
	}

	.hidden {
		opacity: 0;
		pointer-events: none;
	}
</style>
