<script>
	import Header from '$components/Header.svelte';
	import '$src/app.css';

	import { page } from '$app/stores';
	import { toSentenceCase } from '$src/lib';
	export let host = toSentenceCase($page.url.hostname.split('.')[0]);
</script>

<svelte:head>
	<!-- <link rel="stylesheet" href="/css/MainCarousel.css" /> -->
	<title>{host} | Watch Movies and TV Shows online for free</title>
	<meta
		name="description"
		content="Watch free blockbuster movies and binge-worthy series for free! Dive into a wide range of content, from timeless classics to the latest releases. Enjoy easy, hassle-free streaming anytime, anywhere. Start your cinematic adventure now all for free!"
	/>
</svelte:head>
<Header />
<slot />
