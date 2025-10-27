<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '$components/Header.svelte';
	import Footer from '$components/Footer.svelte';

	let scrollY = $state(0);
	let isVisible = $state(false);

	onMount(() => {
		const handleScroll = () => {
			scrollY = window.scrollY;
		};

		window.addEventListener('scroll', handleScroll);

		// Trigger animations on mount
		setTimeout(() => {
			isVisible = true;
		}, 100);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	const stats = [
		{ number: '10M+', label: 'Movies & Shows', icon: '🎬' },
		{ number: '50K+', label: 'Active Users', icon: '👥' },
		{ number: '99.9%', label: 'Uptime', icon: '⚡' },
		{ number: '24/7', label: 'Support', icon: '🛠️' }
	];

	const features = [
		{
			icon: '🎯',
			title: 'Curated Content',
			description:
				'Hand-picked selection of the best movies and TV shows from around the world, updated daily.'
		},
		{
			icon: '🚀',
			title: 'Lightning Fast',
			description:
				'Optimized streaming technology ensures buffer-free viewing with minimal loading times.'
		},
		{
			icon: '🔒',
			title: 'Privacy First',
			description: 'Your viewing habits are private. We never track or sell your personal data.'
		},
		{
			icon: '📱',
			title: 'Cross-Platform',
			description: 'Seamless experience across all devices - desktop, mobile, tablet, and smart TV.'
		},
		{
			icon: '🎨',
			title: 'Beautiful UI',
			description: 'Intuitive design that makes discovering and watching content a pleasure.'
		},
		{
			icon: '💎',
			title: 'Premium Quality',
			description:
				'High-definition streaming with support for 4K content and multiple audio tracks.'
		}
	];

	const team = [
		{
			name: 'Alex Chen',
			role: 'Founder & CEO',
			description: 'Passionate about democratizing entertainment access.',
			avatar: '👨‍💼'
		},
		{
			name: 'Sarah Johnson',
			role: 'CTO',
			description: 'Tech visionary building the future of streaming.',
			avatar: '👩‍💻'
		},
		{
			name: 'Mike Rodriguez',
			role: 'Head of Content',
			description: "Curating the world's best entertainment experiences.",
			avatar: '👨‍🎨'
		},
		{
			name: 'Emma Wilson',
			role: 'UX Designer',
			description: 'Creating beautiful, intuitive user experiences.',
			avatar: '👩‍🎨'
		}
	];
</script>

<svelte:head>
	<title>About Watchlens | Your Ultimate Streaming Destination</title>
	<meta
		name="description"
		content="Learn about Watchlens - the revolutionary streaming platform bringing you unlimited movies and TV shows with cutting-edge technology and user-focused design."
	/>
</svelte:head>

<Header />

<!-- Hero Section -->
<section class="relative flex min-h-screen items-center justify-center overflow-hidden">
	<!-- Animated Background -->
	<div class="from-main via-sec to-tet absolute inset-0 bg-gradient-to-br opacity-90"></div>
	<div
		class="absolute inset-0 opacity-10"
		style="background-image: url(/images/p-pers.webp); background-size: cover; background-position: center; transform: scale(1.1);"
	></div>

	<!-- Floating Elements -->
	<div class="absolute inset-0 overflow-hidden">
		{#each Array(20) as _, i}
			<div
				class="bg-color-3/20 absolute h-2 w-2 animate-pulse rounded-full"
				style="left: {Math.random() * 100}%; top: {Math.random() * 100}%; animation-delay: {i *
					0.1}s;"
			></div>
		{/each}
	</div>

	<div class="relative z-10 mx-auto max-w-4xl px-4 text-center">
		<div
			class="mb-8 transform transition-all duration-1000 {isVisible
				? 'translate-y-0 opacity-100'
				: 'translate-y-8 opacity-0'}"
		>
			<div
				class="border-color-1/20 bg-main/50 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm"
			>
				<span class="text-color-3">✨</span>
				<span class="text-sm font-medium">About Watchlens</span>
			</div>

			<h1
				class="from-color-2 via-color-3 to-color-2 mb-6 bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent md:text-7xl"
			>
				Redefining
				<br />
				<span class="text-color-3">Streaming</span>
			</h1>

			<p class="text-color-1/80 mb-8 text-xl leading-relaxed md:text-2xl">
				We're not just another streaming platform. We're a revolution in how you discover, watch,
				and experience entertainment. Built by movie lovers, for movie lovers.
			</p>

			<div class="flex flex-col justify-center gap-4 sm:flex-row">
				<button
					class="bg-color-3 text-main hover:bg-color-3/90 transform rounded-full px-8 py-4 font-semibold transition-all duration-300 hover:scale-105"
				>
					Start Watching Free
				</button>
				<button
					class="border-color-1/30 text-color-1 hover:bg-color-1/10 rounded-full border px-8 py-4 font-semibold transition-all duration-300"
				>
					Learn More
				</button>
			</div>
		</div>
	</div>

	<!-- Scroll Indicator -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
		<svg class="text-color-1/60 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M19 14l-7 7m0 0l-7-7m7 7V3"
			/>
		</svg>
	</div>
</section>

<!-- Stats Section -->
<section class="bg-sec/50 py-20">
	<div class="mx-auto max-w-6xl px-4">
		<div class="grid grid-cols-2 gap-8 md:grid-cols-4">
			{#each stats as stat, index}
				<div
					class="transform text-center transition-all duration-700 delay-{index * 100} {isVisible
						? 'translate-y-0 opacity-100'
						: 'translate-y-8 opacity-0'}"
				>
					<div class="mb-2 text-4xl">{stat.icon}</div>
					<div class="text-color-3 mb-2 text-3xl font-bold md:text-4xl">{stat.number}</div>
					<div class="text-color-1/70 font-medium">{stat.label}</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Mission Section -->
<section class="py-20">
	<div class="mx-auto max-w-6xl px-4">
		<div class="grid items-center gap-12 md:grid-cols-2">
			<div
				class="transform transition-all delay-200 duration-1000 {isVisible
					? 'translate-x-0 opacity-100'
					: '-translate-x-8 opacity-0'}"
			>
				<div
					class="border-color-3/30 bg-color-3/10 mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1"
				>
					<span class="text-color-3">🎯</span>
					<span class="text-color-3 text-sm font-medium">Our Mission</span>
				</div>

				<h2 class="text-color-2 mb-6 text-4xl font-bold md:text-5xl">
					Democratizing Entertainment
				</h2>

				<p class="text-color-1/80 mb-6 text-lg leading-relaxed">
					We believe everyone deserves access to quality entertainment, regardless of their
					financial situation. That's why we've built Watchlens - a platform that brings you
					unlimited movies and TV shows without breaking the bank.
				</p>

				<p class="text-color-1/80 mb-8 text-lg leading-relaxed">
					Our mission is simple: make premium entertainment accessible to everyone, everywhere, with
					a user experience that puts you first.
				</p>

				<div class="flex flex-wrap gap-4">
					<div class="flex items-center gap-2">
						<div class="bg-color-3 h-2 w-2 rounded-full"></div>
						<span class="text-color-1/70">Free Access</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="bg-color-3 h-2 w-2 rounded-full"></div>
						<span class="text-color-1/70">No Ads (Premium)</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="bg-color-3 h-2 w-2 rounded-full"></div>
						<span class="text-color-1/70">HD Quality</span>
					</div>
				</div>
			</div>

			<div
				class="relative transform transition-all delay-400 duration-1000 {isVisible
					? 'translate-x-0 opacity-100'
					: 'translate-x-8 opacity-0'}"
			>
				<div class="relative">
					<div
						class="from-color-3/20 absolute inset-0 rotate-3 transform rounded-2xl bg-gradient-to-r to-transparent"
					></div>
					<div
						class="bg-main/50 border-color-1/20 relative rounded-2xl border p-8 backdrop-blur-sm"
					>
						<div class="text-center">
							<div class="mb-4 text-6xl">🎬</div>
							<h3 class="text-color-2 mb-4 text-2xl font-bold">10M+ Titles</h3>
							<p class="text-color-1/70 mb-6">
								From blockbuster movies to indie gems, we've got something for every taste and mood.
							</p>
							<div class="grid grid-cols-2 gap-4 text-sm">
								<div class="text-center">
									<div class="text-color-3 font-bold">8,500+</div>
									<div class="text-color-1/60">Movies</div>
								</div>
								<div class="text-center">
									<div class="text-color-3 font-bold">1,200+</div>
									<div class="text-color-1/60">TV Shows</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Features Section -->
<section class="from-sec/30 to-main bg-gradient-to-b py-20">
	<div class="mx-auto max-w-6xl px-4">
		<div class="mb-16 text-center">
			<div
				class="border-color-3/30 bg-color-3/10 mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1"
			>
				<span class="text-color-3">⚡</span>
				<span class="text-color-3 text-sm font-medium">Why Choose Us</span>
			</div>
			<h2 class="text-color-2 mb-6 text-4xl font-bold md:text-5xl">Built for the Modern Viewer</h2>
			<p class="text-color-1/70 mx-auto max-w-3xl text-xl">
				We've reimagined every aspect of the streaming experience to deliver unmatched performance,
				quality, and user satisfaction.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each features as feature, index}
				<div
					class="group transform transition-all duration-700 delay-{index * 100} {isVisible
						? 'translate-y-0 opacity-100'
						: 'translate-y-8 opacity-0'}"
				>
					<div
						class="bg-main/50 border-color-1/20 hover:border-color-3/30 h-full rounded-2xl border p-8 backdrop-blur-sm transition-all duration-300"
					>
						<div class="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">
							{feature.icon}
						</div>
						<h3
							class="text-color-2 group-hover:text-color-3 mb-4 text-xl font-bold transition-colors duration-300"
						>
							{feature.title}
						</h3>
						<p class="text-color-1/70 leading-relaxed">
							{feature.description}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Technology Section -->
<section class="py-20">
	<div class="mx-auto max-w-6xl px-4">
		<div class="grid items-center gap-12 md:grid-cols-2">
			<div
				class="transform transition-all delay-200 duration-1000 {isVisible
					? 'translate-x-0 opacity-100'
					: '-translate-x-8 opacity-0'}"
			>
				<div
					class="border-color-3/30 bg-color-3/10 mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1"
				>
					<span class="text-color-3">🔧</span>
					<span class="text-color-3 text-sm font-medium">Technology</span>
				</div>

				<h2 class="text-color-2 mb-6 text-4xl font-bold md:text-5xl">
					Cutting-Edge Infrastructure
				</h2>

				<p class="text-color-1/80 mb-6 text-lg leading-relaxed">
					Built on modern web technologies and optimized for performance, Watchlens delivers
					lightning-fast streaming with minimal buffering.
				</p>

				<div class="space-y-4">
					<div class="flex items-center gap-3">
						<div class="bg-color-3/20 flex h-8 w-8 items-center justify-center rounded-lg">
							<span class="text-color-3">⚡</span>
						</div>
						<div>
							<div class="text-color-2 font-semibold">Edge Computing</div>
							<div class="text-color-1/60 text-sm">Global CDN for instant loading</div>
						</div>
					</div>

					<div class="flex items-center gap-3">
						<div class="bg-color-3/20 flex h-8 w-8 items-center justify-center rounded-lg">
							<span class="text-color-3">🔒</span>
						</div>
						<div>
							<div class="text-color-2 font-semibold">Privacy First</div>
							<div class="text-color-1/60 text-sm">No tracking, no data collection</div>
						</div>
					</div>

					<div class="flex items-center gap-3">
						<div class="bg-color-3/20 flex h-8 w-8 items-center justify-center rounded-lg">
							<span class="text-color-3">📱</span>
						</div>
						<div>
							<div class="text-color-2 font-semibold">Responsive Design</div>
							<div class="text-color-1/60 text-sm">Perfect on any device</div>
						</div>
					</div>
				</div>
			</div>

			<div
				class="relative transform transition-all delay-400 duration-1000 {isVisible
					? 'translate-x-0 opacity-100'
					: 'translate-x-8 opacity-0'}"
			>
				<div class="relative">
					<div
						class="from-color-3/10 absolute inset-0 -rotate-2 transform rounded-2xl bg-gradient-to-br to-transparent"
					></div>
					<div
						class="bg-main/50 border-color-1/20 relative rounded-2xl border p-8 backdrop-blur-sm"
					>
						<div class="mb-6 text-center">
							<div class="mb-4 text-4xl">🚀</div>
							<h3 class="text-color-2 mb-2 text-2xl font-bold">Performance Metrics</h3>
						</div>

						<div class="space-y-4">
							<div>
								<div class="mb-2 flex justify-between">
									<span class="text-color-1/70">Loading Speed</span>
									<span class="text-color-3 font-semibold">0.8s</span>
								</div>
								<div class="bg-color-1/10 h-2 w-full rounded-full">
									<div
										class="from-color-3 to-color-3/80 h-2 rounded-full bg-gradient-to-r"
										style="width: 95%"
									></div>
								</div>
							</div>

							<div>
								<div class="mb-2 flex justify-between">
									<span class="text-color-1/70">Stream Quality</span>
									<span class="text-color-3 font-semibold">4K</span>
								</div>
								<div class="bg-color-1/10 h-2 w-full rounded-full">
									<div
										class="from-color-3 to-color-3/80 h-2 rounded-full bg-gradient-to-r"
										style="width: 100%"
									></div>
								</div>
							</div>

							<div>
								<div class="mb-2 flex justify-between">
									<span class="text-color-1/70">Uptime</span>
									<span class="text-color-3 font-semibold">99.9%</span>
								</div>
								<div class="bg-color-1/10 h-2 w-full rounded-full">
									<div
										class="from-color-3 to-color-3/80 h-2 rounded-full bg-gradient-to-r"
										style="width: 99%"
									></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Team Section -->
<section class="from-main to-sec/50 bg-gradient-to-b py-20">
	<div class="mx-auto max-w-6xl px-4">
		<div class="mb-16 text-center">
			<div
				class="border-color-3/30 bg-color-3/10 mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1"
			>
				<span class="text-color-3">👥</span>
				<span class="text-color-3 text-sm font-medium">Meet the Team</span>
			</div>
			<h2 class="text-color-2 mb-6 text-4xl font-bold md:text-5xl">
				The Visionaries Behind Watchlens
			</h2>
			<p class="text-color-1/70 mx-auto max-w-3xl text-xl">
				A passionate team of engineers, designers, and content curators working together to
				revolutionize entertainment.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
			{#each team as member, index}
				<div
					class="group transform transition-all duration-700 delay-{index * 100} {isVisible
						? 'translate-y-0 opacity-100'
						: 'translate-y-8 opacity-0'}"
				>
					<div
						class="bg-main/50 border-color-1/20 hover:border-color-3/30 rounded-2xl border p-6 text-center backdrop-blur-sm transition-all duration-300"
					>
						<div class="mb-4 text-6xl transition-transform duration-300 group-hover:scale-110">
							{member.avatar}
						</div>
						<h3
							class="text-color-2 group-hover:text-color-3 mb-2 text-xl font-bold transition-colors duration-300"
						>
							{member.name}
						</h3>
						<div class="text-color-3 mb-3 font-semibold">{member.role}</div>
						<p class="text-color-1/70 text-sm leading-relaxed">
							{member.description}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="from-color-3/10 via-main to-color-3/10 bg-gradient-to-r py-20">
	<div class="mx-auto max-w-4xl px-4 text-center">
		<div
			class="transform transition-all delay-200 duration-1000 {isVisible
				? 'translate-y-0 opacity-100'
				: 'translate-y-8 opacity-0'}"
		>
			<div
				class="border-color-3/30 bg-color-3/10 mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1"
			>
				<span class="text-color-3">🎬</span>
				<span class="text-color-3 text-sm font-medium">Ready to Start?</span>
			</div>

			<h2 class="text-color-2 mb-6 text-4xl font-bold md:text-5xl">
				Join the Streaming Revolution
			</h2>

			<p class="text-color-1/70 mx-auto mb-8 max-w-2xl text-xl">
				Experience entertainment like never before. Start your journey with Watchlens today and
				discover why millions choose us for their streaming needs.
			</p>

			<div class="flex flex-col justify-center gap-4 sm:flex-row">
				<button
					class="bg-color-3 text-main hover:bg-color-3/90 transform rounded-full px-8 py-4 font-semibold transition-all duration-300 hover:scale-105"
				>
					Start Watching Now
				</button>
				<button
					class="border-color-1/30 text-color-1 hover:bg-color-1/10 rounded-full border px-8 py-4 font-semibold transition-all duration-300"
				>
					View Pricing
				</button>
			</div>
		</div>
	</div>
</section>

<Footer />

<style>
	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.animate-float {
		animation: float 3s ease-in-out infinite;
	}
</style>
