<script lang="ts">
	import Header from '$components/Header.svelte';
	import PricingCards from '$components/PricingCards.svelte';
</script>

<Header />
<section class="flex flex-col gap-20 px-[1rem] py-[3rem]">
	<div class="flex flex-col items-center gap-2">
		<p class="border-color-1/20 flex items-center gap-1 rounded-full border px-3 py-1">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="text-color-3 size-4"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
				/>
			</svg>
			<span>pricing</span>
		</p>
		<p class="text-center text-[2rem] leading-none">Choose your plan</p>
		<p class="text-color-1/60 text-center leading-none">
			Explore our flexible pricing designed for your streaming needs
		</p>
	</div>

	<PricingCards />
</section>
