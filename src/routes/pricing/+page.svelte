<script lang="ts">
	import Header from '$components/Header.svelte';
	import { isSubscribed, walletAccount } from '$lib/stores/wallet';

	// Contract addresses......
	const CONTRACT_ADDRESS = '0x0520588f2e74b510940c9e41f272b38652333d870eb43816b68732804076417c';
	const STRK_TOKEN_ADDRESS = '0x04718f5a0Fc34cC1AF16A1cdee98fFB20C31f5cD61D6Ab07201858f4287c938D';

	// RPC URL.............
	const RPC_URL = 'https://api.cartridge.gg/x/starknet/sepolia';

	async function fetchSubscriptionAmount() {
		if (!$walletAccount) return;

		try {
			const { Contract } = await import('starknet');

			// Import contract ABI
			const contractAbiModule = await import('$lib/dev/contract-class.json');
			const contractAbi = contractAbiModule.abi;

			// Create contract instance
			const contract = new Contract(contractAbi, CONTRACT_ADDRESS, $walletAccount);

			// Get subscription amount
			const response = await contract.call('get_subscription_amount');
			console.log('Subscription Amount:', response);

			return response;
		} catch (error) {
			console.error('Error fetching subscription amount:', error);
			throw new Error("Couldn't fetch subscription amount");
		}
	}

	async function handleApprove() {
		if (!$walletAccount) {
			alert('Please connect your wallet first');
			return false;
		}

		try {
			// Get subscription amount first
			const subscription_amount = await fetchSubscriptionAmount();
			if (!subscription_amount) {
				throw new Error("Couldn't fetch subscription amount");
			}

			// Use low-level uint256 representation for the amount
			// Starknet expects uint256 as two felt fields (low and high)
			const amountBigInt = BigInt(subscription_amount.toString());
			const low = amountBigInt & BigInt('0xffffffffffffffffffffffffffffffff');
			const high = amountBigInt >> BigInt(128);

			console.log(`Approving ${CONTRACT_ADDRESS} to spend ${subscription_amount} tokens`);

			// Make the call with proper uint256 representation
			const calls = [
				{
					contractAddress: STRK_TOKEN_ADDRESS,
					entrypoint: 'approve',
					calldata: [CONTRACT_ADDRESS, low.toString(), high.toString()]
				}
			];

			console.log('Executing calls:', JSON.stringify(calls, null, 2));

			// Execute the transaction
			const response = await $walletAccount.execute(calls);

			console.log('Transaction submitted:', response);

			// Wait for transaction confirmation
			const { TransactionExecutionStatus, RpcProvider } = await import('starknet');
			const provider = new RpcProvider({ nodeUrl: RPC_URL });
			const receipt = await provider.waitForTransaction(response.transaction_hash, {
				successStates: [TransactionExecutionStatus.SUCCEEDED]
			});
			console.log('Transaction confirmed:', receipt);
			handleSubscribe();
			return true;
		} catch (error) {
			console.error('Approval failed:', error);
			alert(
				'Failed to approve token spending: ' +
					(error instanceof Error ? error.message : String(error))
			);
			return false;
		}
	}

	async function handleSubscribe() {
		if (!$walletAccount) {
			alert('Please connect your wallet first');
			return;
		}

		try {
			// Import contract ABI
			const contractAbiModule = await import('$lib/dev/contract-class.json');
			const contractAbi = contractAbiModule.abi;

			// Create contract instance
			const { Contract } = await import('starknet');
			const contract = new Contract(contractAbi, CONTRACT_ADDRESS, $walletAccount);

			// Create the subscribe call
			const subscribeCall = contract.populate('subscribe', []);

			// Execute the transaction
			const response = await $walletAccount.execute(subscribeCall);
			console.log('Subscribe transaction hash:', response.transaction_hash);

			// Wait for confirmation
			const { TransactionExecutionStatus, RpcProvider } = await import('starknet');
			const provider = new RpcProvider({ nodeUrl: RPC_URL });
			const receipt = await provider.waitForTransaction(response.transaction_hash, {
				successStates: [TransactionExecutionStatus.SUCCEEDED]
			});

			console.log('Subscription confirmed:', receipt);
			isSubscribed.set(true);
			return receipt;
		} catch (error) {
			console.error('Subscription failed:', error);
			alert('Failed to subscribe: ' + (error instanceof Error ? error.message : String(error)));
		}
	}
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

	<div class="containe flex w-full flex-wrap justify-center gap-10">
		<div class="card border-color-1/20 flex w-[320px] flex-col gap-4 rounded-[1.5rem] border p-5">
			<div class="border-color-1/20 bg-main self-start rounded-[0.7rem] border p-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="text-color-3 size-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
					/>
				</svg>
			</div>
			<p>Basic</p>
			<p class="text-color-1/60">
				<span class="text-color-1 text-[2rem] font-medium">$0</span> /month
			</p>
			<p class="text-color-1/90">Includes unlimited movie and tv show streaming (with ads)</p>
			<hr class="text-color-1/20" />
			<p class="text-color-1/50">What&apos;s included</p>
			<ul class="flex flex-col gap-2">
				<li class="flex items-center gap-1">
					<svg
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
							d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
						/>
					</svg>
					<span>Basic customer support</span>
				</li>
				<li class="flex items-center gap-1">
					<svg
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
							d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
						/>
					</svg>
					<span>Unlimited streaming</span>
				</li>
				<li class="flex items-center gap-1 opacity-[0.3]">
					<svg
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
							d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
						/>
					</svg>
					<span>Unlimited downloads</span>
				</li>
				<li class="flex items-center gap-1 opacity-[0.3]">
					<svg
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
							d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
						/>
					</svg>
					<span>Ad-free streaming</span>
				</li>
			</ul>
			<button
				class="bg-sec hover:bg-color-3 hover:text-main border-color-2/20 flex w-full cursor-pointer items-center justify-center gap-1 rounded-full border py-[0.5rem]"
			>
				<span>Continue</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
					/>
				</svg>
			</button>
		</div>

		<div
			class="card border-color-1/20 bg-sec flex w-[320px] flex-col gap-4 rounded-[1.5rem] border p-5"
		>
			<div class="border-color-1/20 bg-main self-start rounded-[0.7rem] border p-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="text-color-3 size-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
					/>
				</svg>
			</div>
			<p>Premium</p>
			<p class="text-color-1/60">
				<span class="text-color-1 text-[2rem] font-medium">$2.99</span> /month
			</p>
			<p class="text-color-1/90">Includes unlimited movie and tv show streaming (with ads)</p>
			<hr class="text-color-1/20" />
			<p class="text-color-1/50">What&apos;s included</p>
			<ul class="flex flex-col gap-2">
				<li class="flex items-center gap-1">
					<svg
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
							d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
						/>
					</svg>
					<span>Premium customer support</span>
				</li>
				<li class="flex items-center gap-1">
					<svg
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
							d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
						/>
					</svg>
					<span>Unlimited streaming</span>
				</li>
				<li class="flex items-center gap-1">
					<svg
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
							d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
						/>
					</svg>
					<span>Unlimited downloads</span>
				</li>
				<li class="flex items-center gap-1">
					<svg
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
							d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
						/>
					</svg>
					<span>Ad-free streaming</span>
				</li>
			</ul>
			<button
				onclick={() => handleApprove()}
				class="bg-sec hover:bg-color-3 hover:text-main border-color-2/20 flex w-full cursor-pointer items-center justify-center gap-1 rounded-full border py-[0.5rem]"
			>
				<span>Get Started</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
					/>
				</svg>
			</button>
		</div>
	</div>
</section>
