<script lang="ts">
	import { onMount } from 'svelte';

	let currentYear = new Date().getFullYear();

	onMount(() => {
		currentYear = new Date().getFullYear();
	});
</script>

<footer class="from-main via-sec to-tet text-color-1 relative overflow-hidden bg-gradient-to-b">
	<!-- Background Pattern -->
	<div class="absolute inset-0 opacity-5">
		<div
			class="absolute inset-0"
			style="background-image: url(/images/p-pers.webp); background-size: cover; background-position: center;"
		></div>
	</div>

	<!-- Main Footer Content -->
	<div class="relative z-10">
		<!-- Top Section -->
		<div class="border-color-1/10 border-b">
			<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
					<!-- Brand Section -->
					<div class="lg:col-span-1">
						<div class="mb-4 flex items-center gap-2">
							<img src="/logo.svg" alt="Watchlens" class="h-8 w-8" />
							<span class="text-color-3 text-xl font-bold">Watchlens</span>
						</div>
						<p class="text-color-1/70 mb-4 max-w-xs text-sm">
							Your ultimate destination for free movies and TV shows. Stream the latest blockbusters
							and binge-worthy series anytime, anywhere.
						</p>
						<!-- Social Links -->
						<div class="flex space-x-4">
							<a
								href="https://facebook.com/watchlens"
								target="_blank"
								rel="noopener noreferrer"
								class="text-color-1/60 hover:text-color-3 transition-colors duration-200"
								aria-label="Facebook"
							>
								<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
									/>
								</svg>
							</a>
							<a
								href="https://twitter.com/watchlens"
								target="_blank"
								rel="noopener noreferrer"
								class="text-color-1/60 hover:text-color-3 transition-colors duration-200"
								aria-label="Twitter"
							>
								<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
									/>
								</svg>
							</a>
							<a
								href="https://instagram.com/watchlens"
								target="_blank"
								rel="noopener noreferrer"
								class="text-color-1/60 hover:text-color-3 transition-colors duration-200"
								aria-label="Instagram"
							>
								<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"
									/>
								</svg>
							</a>
							<a
								href="https://youtube.com/@watchlens"
								target="_blank"
								rel="noopener noreferrer"
								class="text-color-1/60 hover:text-color-3 transition-colors duration-200"
								aria-label="YouTube"
							>
								<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
									/>
								</svg>
							</a>
						</div>
					</div>

					<!-- Quick Links -->
					<div>
						<h3 class="text-color-2 mb-4 text-sm font-semibold tracking-wider uppercase">Browse</h3>
						<ul class="space-y-3">
							<li>
								<a
									href="/"
									class="text-color-1/70 hover:text-color-3 text-sm transition-colors duration-200"
									>Home</a
								>
							</li>
							<li>
								<a
									href="/trending"
									class="text-color-1/70 hover:text-color-3 text-sm transition-colors duration-200"
									>Trending</a
								>
							</li>
							<li>
								<a
									href="/movies"
									class="text-color-1/70 hover:text-color-3 text-sm transition-colors duration-200"
									>Movies</a
								>
							</li>
							<li>
								<a
									href="/tv-shows"
									class="text-color-1/70 hover:text-color-3 text-sm transition-colors duration-200"
									>TV Shows</a
								>
							</li>
							<li>
								<a
									href="/genres"
									class="text-color-1/70 hover:text-color-3 text-sm transition-colors duration-200"
									>Genres</a
								>
							</li>
							<li>
								<a
									href="/new-releases"
									class="text-color-1/70 hover:text-color-3 text-sm transition-colors duration-200"
									>New Releases</a
								>
							</li>
						</ul>
					</div>

					<!-- Support -->
					<div>
						<h3 class="text-color-2 mb-4 text-sm font-semibold tracking-wider uppercase">
							Support
						</h3>
						<ul class="space-y-3">
							<li>
								<a
									href="/help"
									class="text-color-1/70 hover:text-color-3 text-sm transition-colors duration-200"
									>Help Center</a
								>
							</li>
							<li>
								<a
									href="/contact"
									class="text-color-1/70 hover:text-color-3 text-sm transition-colors duration-200"
									>Contact Us</a
								>
							</li>
							<li>
								<a
									href="/faq"
									class="text-color-1/70 hover:text-color-3 text-sm transition-colors duration-200"
									>FAQ</a
								>
							</li>
							<li>
								<a
									href="/report"
									class="text-color-1/70 hover:text-color-3 text-sm transition-colors duration-200"
									>Report Issue</a
								>
							</li>
							<li>
								<a
									href="/feedback"
									class="text-color-1/70 hover:text-color-3 text-sm transition-colors duration-200"
									>Feedback</a
								>
							</li>
						</ul>
					</div>

					<!-- Legal -->
					<div>
						<h3 class="text-color-2 mb-4 text-sm font-semibold tracking-wider uppercase">Legal</h3>
						<ul class="space-y-3">
							<li>
								<a
									href="/privacy"
									class="text-color-1/70 hover:text-color-3 text-sm transition-colors duration-200"
									>Privacy Policy</a
								>
							</li>
							<li>
								<a
									href="/terms"
									class="text-color-1/70 hover:text-color-3 text-sm transition-colors duration-200"
									>Terms of Service</a
								>
							</li>
							<li>
								<a
									href="/cookies"
									class="text-color-1/70 hover:text-color-3 text-sm transition-colors duration-200"
									>Cookie Policy</a
								>
							</li>
							<li>
								<a
									href="/dmca"
									class="text-color-1/70 hover:text-color-3 text-sm transition-colors duration-200"
									>DMCA</a
								>
							</li>
							<li>
								<a
									href="/disclaimer"
									class="text-color-1/70 hover:text-color-3 text-sm transition-colors duration-200"
									>Disclaimer</a
								>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<!-- Bottom Section -->
		<div class="bg-tet/50">
			<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
				<div class="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
					<!-- Copyright -->
					<div class="text-center md:text-left">
						<p class="text-color-1/60 text-sm">
							© {currentYear} Watchlens. All rights reserved.
						</p>
						<p class="text-color-1/50 mt-1 text-xs">
							This site is for educational purposes only. We do not host any content.
						</p>
					</div>

					<!-- Additional Info -->
					<div class="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-6">
						<div class="text-color-1/50 flex items-center space-x-4 text-xs">
							<span>Made with ❤️ for movie lovers</span>
							<span class="hidden md:inline">•</span>
							<span class="hidden md:inline">Version 1.0.0</span>
						</div>

						<!-- Language/Region Selector -->
						<div class="flex items-center space-x-2">
							<svg
								class="text-color-1/60 h-4 w-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
								/>
							</svg>
							<select
								class="text-color-1/60 cursor-pointer border-none bg-transparent text-xs outline-none"
							>
								<option value="en">English</option>
								<option value="es">Español</option>
								<option value="fr">Français</option>
								<option value="de">Deutsch</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Decorative Elements -->
	<div
		class="via-color-3/30 absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent to-transparent"
	></div>
	<div
		class="via-color-3/20 absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent to-transparent"
	></div>
</footer>
