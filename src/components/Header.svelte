<script lang="ts">
	import { goto, onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import LivesearchResult from '$components/LivesearchResult.svelte';
	import { connect } from '@starknet-io/get-starknet';
	import { Contract } from 'starknet';
	import {
		walletAccount,
		walletAddress,
		isConnected,
		isConnecting,
		isSubscribed
	} from '$lib/stores/wallet';

	$effect(() => {
		if ($isSubscribed) {
			goto('/');
		}
	});

	// Contract addresses
	const CONTRACT_ADDRESS = '0x0520588f2e74b510940c9e41f272b38652333d870eb43816b68732804076417c';
	const STRK_TOKEN_ADDRESS = '0x04718f5a0Fc34cC1AF16A1cdee98fFB20C31f5cD61D6Ab07201858f4287c938D';

	// RPC URL
	const RPC_URL = 'https://api.cartridge.gg/x/starknet/sepolia';

	async function connectWallet() {
		if ($isConnecting || $isConnected) {
			return;
		}

		try {
			$isConnecting = true;

			// Import required modules
			const { WalletAccount, RpcProvider } = await import('starknet');

			// Open wallet selection modal
			const selectedWalletSWO = await connect({
				modalMode: 'alwaysAsk',
				modalTheme: 'dark'
			});

			if (!selectedWalletSWO) {
				console.log('No wallet selected');
				return;
			}

			// Connect with the WalletAccount API
			const provider = new RpcProvider({ nodeUrl: RPC_URL });
			const myWalletAccount = await WalletAccount.connect(provider, selectedWalletSWO);

			// Update stores
			walletAccount.set(myWalletAccount);
			walletAddress.set(myWalletAccount.address);
			isConnected.set(true);

			console.log('Wallet connected:', myWalletAccount.address);

			// Fetch user data after connection
			const userData = await fetchUserData();
			console.log('date', userData?.date);
			if (userData && Date.now() >= Number(userData.date) * 1000) {
				isSubscribed.set(false);
			} else {
				isSubscribed.set(true);
			}

			return myWalletAccount;
		} catch (error) {
			console.error('Error connecting wallet:', error);
			alert(
				'Failed to connect wallet: ' + (error instanceof Error ? error.message : String(error))
			);
			return null;
		} finally {
			$isConnecting = false;
		}
	}

	// Fetch user data from contract
	async function fetchUserData() {
		if (!$walletAccount || !$walletAddress) return;

		try {
			// Import contract ABI
			const contractAbiModule = await import('$lib/dev/contract-class.json');
			const contractAbi = contractAbiModule.abi;

			// Create contract instance
			const contract = new Contract(contractAbi, CONTRACT_ADDRESS, $walletAccount);

			// Call fetch_user function
			const response = await contract.call('fetch_user', [$walletAddress]);

			// Update user state
			const result = response as unknown as { amount: bigint; date: bigint; user_address: bigint };
			console.log('User state:', result);
			if (Date.now() >= Number(result.date) * 1000) {
				isSubscribed.set(false);
			} else {
				isSubscribed.set(true);
			}
			return result;
		} catch (error) {
			console.error('Error fetching user data:', error);
			alert(
				'Failed to fetch user data: ' + (error instanceof Error ? error.message : String(error))
			);
		}
	}

	let isNavToggled = $state(false);
	let isSearchToggled = $state(false);
	let searchValue: string = $state('');
	let timeout: any;

	onNavigate(() => {
		isSearchToggled = false;
	});

	const search = (e: any) => {
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			// Perform the fetch request or any other operation here
			searchValue = e.target.value.toLowerCase();
		}, 500); // 500ms delay after the last keystroke
	};
	$effect(() => {
		document.addEventListener('click', (e: any) => {
			if (e.target.tagName === 'A' && e.target.target === '_blank') {
				console.log('Opening in new tab:', e.target.href);
				// Can prevent or modify here
				// e.preventDefault();
			}
		});

		self.addEventListener('fetch', (event: any) => {
			const url = new URL(event.request.url);
			const currentOrigin = new URL(self.location as any).origin;

			// Block external navigations
			if (event.request.mode === 'navigate' && url.origin !== currentOrigin) {
				event.respondWith(
					new Response('External navigation blocked', {
						status: 403,
						statusText: 'Forbidden'
					})
				);
				return;
			}
		});
	});
</script>

<div
	class={`bg-tet fixed top-0  left-0 z-30 h-screen w-[80vw] p-[10%] shadow-2xl ${
		isNavToggled ? 'translate-x-0' : 'translate-x-[-100%]'
	} transition-all duration-300`}
>
	<!-- <button class="absolute right-[10%]" on:click={() => (isNavToggled = !isNavToggled)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-5"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
			</svg>
		</button> -->

	<nav class="flex h-full w-full items-center justify-center">
		<ul class="text-color-1 flex flex-col gap-5 text-center">
			<li class="">
				<a href="/">Home</a>
			</li>
			<li class="">
				<a href="/about">About</a>
			</li>
			<li class="">
				<a href="/pricing">Pricing</a>
			</li>
		</ul>
	</nav>
</div>
<header
	class={`h flex w-full items-center justify-between px-8 py-[1.2rem] max-sm:px-3 max-sm:py-[0.8rem] ${
		page.url.pathname == '/' && 'absolute z-10'
	} from-main via-main/80  bg-gradient-to-b to-transparent`}
>
	<div class="left-section flex items-center gap-0">
		<div class="logo-cont center-div">
			<a data-sveltekit-preload-data aria-label="Home" href="/">
				<svg
					class="fill-color-3 w-[120px]"
					xmlns="http://www.w3.org/2000/svg"
					xml:space="preserve"
					width="3.5in"
					version="1.1"
					style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
					viewBox="0 0 3500 1000"
					xmlns:xlink="http://www.w3.org/1999/xlink"
				>
					<defs>
						<style type="text/css">
						</style>
					</defs>
					<g id="Layer_x0020_1">
						<metadata id="CorelCorpID_0Corel-Layer" />
						<g id="_2771414601776">
							<path
								class="fil0"
								d="M467.03 710.01c0,4.05 5.85,1.91 13.64,0.81 5.15,-0.73 10.28,-1.33 15.81,-2.15l80.5 -11.01c4.89,-0.71 12.46,-2.09 16.63,-2.19l-0.85 -212.09 94.93 0 0 136.83c0,22.36 0.85,41.81 0.85,64.14l108.47 -9.55c3.85,-0.4 11.45,-1.57 15.53,-1.57l0.85 -385.7c0,-18.64 0.86,-35.46 0.86,-54.73l-126.57 0 0 150.52 -94.93 0 0 -150.52 -125.72 0 0 477.2z"
							/>
							<path
								class="fil0"
								d="M2084.22 555.22c-15.11,0 -26.24,-0.86 -37.42,-12.18 -8.24,-8.34 -11.31,-13.41 -15.98,-25.07 -15.85,-39.62 -18.17,-151.33 17.25,-185.33 19.35,-18.57 56.13,-17.71 73.11,7.74 17.86,26.76 17.78,64.77 17.78,98.54 0,27.29 -2.77,54.97 -8.91,76.61 -5.93,20.87 -21.91,39.7 -45.82,39.7zm-13.68 93.22c32.89,0 50.47,-0.77 81.35,-11.86 36.44,-13.09 68.17,-41.02 89,-73.49 23.44,-36.54 34.04,-82.31 34.04,-129.31 0,-47.22 -11.2,-95.8 -39.09,-132.8l-11.14 -13.66c-4.22,-4.2 -7.79,-7.76 -11.98,-11.96 -7.84,-7.85 -18.36,-15.73 -28.06,-21.54 -36,-21.55 -65.82,-27 -111.55,-27 -29.23,0 -61.87,8.17 -81.24,17.95 -35.47,17.91 -56.64,38 -77.24,72.43 -14.83,24.78 -20.68,45.7 -26.17,73.03 -2.89,14.37 -3.04,30.31 -4.33,46.19 -0.39,4.77 0.81,6.14 0.87,11.01 0.34,27.61 3.64,48.22 12.47,74.76 6.33,19.04 21.57,48.77 36.44,63.62 4.35,4.34 7.16,8.83 12.13,12.67 17.17,13.26 16.83,17.07 43.83,30.58 19.99,10 51.13,19.38 80.67,19.38z"
							/>
							<path
								class="fil0"
								d="M885.22 628.77l0 38.48c12.84,0 41.17,-3.52 57.29,-4.28l230.91 -18.81c4.69,-0.07 5.58,-0.65 9.43,-0.83 4.31,-0.21 7,-0.8 10.25,-0.87l0 -95.78c0,-1.97 -0.59,-2.57 -2.57,-2.57l-182.16 0 0 -65.85 147.09 0c1.97,0 2.57,-0.59 2.57,-2.57l0 -88.94 -149.66 0 0 -59.01 184.72 0 0 -94.93 -308.73 0c0,132.87 0.85,263.09 0.85,395.96z"
							/>
							<path
								class="fil0"
								d="M2402.36 431.22l-2.24 2.89c-0.89,1.28 -1.37,2.08 -2,3.13l-28.84 46.42c-14.82,25.07 -34.37,53.76 -49.3,78.99 -12.37,20.93 -28.51,44.65 -41.05,65.85 -1.84,3.11 -7.57,11.3 -8.28,13.96 8.76,0.73 19.99,2.1 28.46,3.18 19.4,2.46 38.6,3.09 57.55,5.74l28.59 3.06c3.58,-5.35 6.13,-11.35 9.44,-17.07l38.16 -69.6c3.07,-6.05 27.73,-49.4 28.51,-52.74l1.71 0c0.81,3.48 2.39,4.99 3.99,7.98 1.75,3.24 2.88,5.47 4.52,8.31l62.19 113.13c2.84,5.74 5.97,10.65 8.78,16.02 2.79,5.35 9.71,4.57 19.74,5.06l133.34 10.33c2.7,0.2 3.09,0.74 6.04,0.8 -0.93,-3.48 -6.93,-11.93 -9.13,-15.67 -3.26,-5.51 -6.47,-10.46 -9.85,-15.81l-58.81 -95.13c-18.65,-30.96 -40.61,-64.52 -58.78,-95.16 -2.59,-4.37 -18.13,-28.14 -19.08,-32.23 17,-25.39 38.46,-61.15 55.42,-88.26 6.84,-10.94 62.62,-98.47 63.45,-101.6l-113.74 0c-7.3,13.79 -23.7,39.91 -32.55,54.69 -2.44,4.09 -30.57,52.78 -33.3,54.78 -1.27,-5.43 -61.25,-104.39 -62.43,-109.47l-147.09 0 126.57 198.41z"
							/>
							<path
								class="fil0"
								d="M3142.11 736.52c2.94,0.24 5.43,1.15 8.48,1.78l49.85 11.72c3.3,0.78 5.64,1.81 9.23,1.89l40.3 -129.03c3.24,-10.61 6.18,-21.21 9.82,-32.08l20.31 -65.21c10.87,-36.92 24.83,-77.45 35.12,-113.69l10.21 -32.55c1.8,-6.12 3.35,-10.41 5,-16.37 1.26,-4.57 3.27,-11.06 4.84,-15.69l35.17 -114.49 -103.48 0 -9.41 32.5c-17.53,63.3 -37.94,131.09 -56.55,194.89 -3.06,10.49 -6.78,21.77 -9.31,32.6 -1.87,-2.69 -19,-61.52 -19.78,-64.04l-28.61 -97.96c-3.2,-11.13 -5.9,-21.56 -9.44,-32.46l-19.14 -65.53 -132.56 0 29.83 94.18c13.65,40.58 26.37,85.06 39.96,125.94l40.22 125.69c3.61,11.06 6.38,20.89 10.04,31.86 7.04,21.11 13.15,42.22 20.09,62.86l19.78 63.18z"
							/>
							<polygon
								class="fil0"
								points="1241.85,642.45 1365,642.45 1365,489.37 1498.41,489.37 1498.41,397.01 1365,397.01 1365,331.16 1538.6,331.16 1538.6,232.81 1241.85,232.81 "
							/>
							<path
								class="fil0"
								d="M142.91 331.16l82.1 0c4.5,0 2.3,8.02 1.95,10.49l-0.2 205.05c-0.06,5.02 -0.94,7.03 -0.9,12.78 0.19,34.18 1.13,200.28 -0.85,204.41 4.8,0 10.33,-1.94 14.88,-3.08 5.42,-1.35 9.95,-2.5 15.06,-3.76l89.79 -23.09c0,-134.94 1.71,-267.71 1.71,-402.8l84.67 0 0 -98.35 -288.2 0 0 98.35z"
							/>
							<path
								class="fil0"
								d="M2674.31 331.16l84.67 0 0 350.63c4.15,0.09 10.19,1.31 14.56,1.69 28.63,2.47 59.39,6.98 88.04,9.46 4.37,0.38 10.41,1.59 14.56,1.69 0,-7.43 0.86,-13.09 0.85,-21.38 -0.01,-114.25 1.71,-227.87 1.71,-342.08l84.67 0 0 -98.35 -289.06 0 0 98.35z"
							/>
							<polygon
								class="fil0"
								points="1577.94,642.45 1865.29,642.45 1865.29,541.54 1704.51,541.54 1704.51,232.81 1577.94,232.81 "
							/>
						</g>
					</g>
				</svg>
			</a>
		</div>

		<div
			class={`focused search-bar dropdown relative z-[100] mx-[20px]   h-full w-[40vw] max-sm:fixed max-sm:top-0 max-sm:right-0 max-sm:mx-0 max-sm:w-full max-sm:items-start max-sm:bg-gray-700/20 max-sm:px-5 max-sm:py-[90px] max-sm:backdrop-blur-md ${
				!isSearchToggled ? 'max-sm:hidden' : ''
			}`}
			id="searchBar"
		>
			<div class="absolute top-5 right-5 hidden text-[15px] text-white max-sm:block">
				<button aria-label="Cancel" onclick={() => (isSearchToggled = !isSearchToggled)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			<form
				onsubmit={(e) => e.preventDefault()}
				class="group center-div bg-tet flex h-[40px] w-full rounded-[1.5rem] p-2 shadow-2xl shadow-gray-950 max-sm:h-[50px] max-sm:bg-black"
			>
				<div
					class="search-rep-ico flex items-center justify-center gap-1 rounded-[50rem] bg-[#353535] px-[0.8rem] py-[0.3rem] text-[0.6rem] font-[300] text-gray-400 max-sm:bg-transparent"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-[15px]"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
						/>
					</svg>
					<span class="max-sm:hidden">Filter</span>
				</div>
				<input
					tabIndex={0}
					autoComplete="off"
					id="searchInput"
					type="text"
					value={searchValue}
					name="q"
					placeholder="Search Movies and Tv Shows"
					oninput={search}
					class="h-full w-[92%] border-none bg-transparent pl-[10px] text-center text-[12px] font-[300] text-white outline-none"
				/>
				<div
					class="search-rep-ico text-color-3 flex items-center justify-center rounded-[50rem] px-[0.8rem] py-[0.3rem] text-[0.6rem] font-[300]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-[15px]"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
						/>
					</svg>
				</div>
			</form>
			<div
				id="searchresult"
				tabIndex={0}
				class="dropdown-content bg-tet absolute top-[43px] left-0 z-[-1] max-h-[50vh] w-full overflow-x-hidden overflow-y-auto rounded-2xl px-[5%] py-4 shadow-2xl shadow-black/80 backdrop-blur-[60px] max-sm:top-[150px] max-sm:left-[5vw] max-sm:max-h-[70vh] max-sm:w-[90%] max-sm:rounded-2xl max-sm:bg-black"
			>
				{#key searchValue}
					<LivesearchResult query={searchValue} />
				{/key}
			</div>
		</div>
	</div>

	<!-- <div class="right-section">
		<nav class="nav w-full hidden">
			<ul class="flex w-full justify-between gap-[25px] max-lg:hidden">
				<li class="text-[12px] text-[#f3f3f3]" style="text-shadow: 0.5px 0.5px 0.5px black">
					<a href="/">Home</a>
				</li>
				<li class="text-[12px] text-[#f3f3f3]" style="text-shadow: 0.5px 0.5px 0.5px black">
					<a href="/tvshows">TV Shows</a>
				</li>
				<li class="text-[12px] text-[#f3f3f3]" style="text-shadow: 0.5px 0.5px 0.5px black">
					<a href="/movies">Movies</a>
				</li>
				<li class="text-[12px] text-[#f3f3f3]" style="text-shadow: 0.5px 0.5px 0.5px black">
					<a href="/movies">Trending</a>
				</li>
			</ul>
		</nav>

		<nav class="md-nav hidden pr-[3vw] max-lg:block">
			<div class="flex w-full justify-between gap-[25px]">
				<button aria-label="Search" onclick={() => (isSearchToggled = true)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6 text-white"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
						/>
					</svg>
				</button>

				<button aria-label="Menu" onclick={() => (isNavToggled = !isNavToggled)}
					><svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6 text-white"
					>
						{#if isNavToggled}
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
						{:else}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 9h16.5m-16.5 6.75h16.5"
							/>
						{/if}
					</svg>
				</button>
			</div>
		</nav>
	</div>  -->

	<div class="right flex items-center gap-5 max-sm:gap-5">
		{#if !$isConnected}
			<nav class="text-color-1 flex list-none items-center gap-3 font-normal max-sm:hidden">
				<li><a href="/">Home</a></li>
				<li>&middot;</li>
				<li><a href="/about">About</a></li>
				<li>&middot;</li>
				<li><a href="/pricing">Pricing</a></li>
			</nav>
		{/if}

		<nav class="md-nav hidden max-lg:block">
			<div class="flex w-full justify-between gap-5">
				<button aria-label="Search" class="text-white" onclick={() => (isSearchToggled = true)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-5 text-white"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
						/>
					</svg>
				</button>

				<button aria-label="Menu" onclick={() => (isNavToggled = !isNavToggled)}
					><svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6 text-white"
					>
						{#if isNavToggled}
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
						{:else}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 9h16.5m-16.5 6.75h16.5"
							/>
						{/if}
					</svg>
				</button>
			</div>
		</nav>
		{#if $isConnected && $isSubscribed}
			<div class="flex items-center gap-2 max-sm:hidden">
				<p>premium user</p>
				<img src="/images/badge.webp" alt="" class="size-6" />
			</div>
		{/if}
		{#if $isConnected && !$isSubscribed}
			<button
				onclick={() => goto('/pricing')}
				class="connect-button flex cursor-pointer items-center gap-2 rounded-full border border-1 border-[hotpink] bg-transparent px-4 py-2 font-medium text-[hotpink] max-sm:rounded-full max-sm:p-1"
				>Get Pro <svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-4"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
					/>
				</svg>
			</button>
		{/if}

		<button
			onclick={async () => await connectWallet()}
			class="connect-button border-color-1/20 bg-color-3/90 flex cursor-pointer items-center gap-2 rounded-full border-1 border-2 px-4 py-2 font-medium text-black max-sm:rounded-full max-sm:p-1"
		>
			{#if $isConnected}
				<img
					src="/images/pfp.webp"
					alt=""
					class="border-main/60 size-4 rounded-full border object-cover object-cover p-[2px]"
				/>
			{/if}
			{#if $isConnected}
				<span class="leading-none max-sm:hidden"
					>{$walletAddress.slice(0, 5) + ' · · · ' + $walletAddress.slice(-5)}</span
				>
			{:else}
				<span class="max-sm:hidden">Connect Wallet</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2.5"
					stroke="currentColor"
					class="size-4"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
					/>
				</svg>
			{/if}
		</button>
	</div>
</header>
