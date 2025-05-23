<script lang="ts">
	import { writable } from 'svelte/store';

	// Create stores for application state
	const walletAccount = writable<import('starknet').WalletAccount | null>(null);
	const walletAddress = writable<string>('');
	const isConnected = writable(false);
	const isConnecting = writable(false);
	const userState = writable<{
		amount: bigint;
		date: bigint;
		user_address: bigint;
	} | null>(null);

	// Contract addresses
	const CONTRACT_ADDRESS = '0x0520588f2e74b510940c9e41f272b38652333d870eb43816b68732804076417c';
	const STRK_TOKEN_ADDRESS = '0x04718f5a0Fc34cC1AF16A1cdee98fFB20C31f5cD61D6Ab07201858f4287c938D';

	// RPC URL
	const RPC_URL = 'https://api.cartridge.gg/x/starknet/sepolia';

	// Connect wallet using the new StarkNet.js interface
	async function connectWallet() {
		//...
		if ($isConnecting) {
			return;
		}

		try {
			$isConnecting = true;

			// Import required modules
			const { connect } = await import('@starknet-io/get-starknet');
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
			$walletAccount = myWalletAccount;
			$walletAddress = myWalletAccount.address;
			$isConnected = true;

			console.log('Wallet connected:', $walletAddress);

			// Fetch user data after connection
			await fetchUserData();

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

	// Disconnect wallet
	function disconnectWallet() {
		$walletAccount = null;
		$walletAddress = '';
		$isConnected = false;
		$userState = null;
	}

	// Fetch user data from contract
	async function fetchUserData() {
		if (!$walletAccount || !$walletAddress) return;

		try {
			const { Contract } = await import('starknet');

			// Import contract ABI
			const contractAbiModule = await import('$lib/dev/contract-class.json');
			const contractAbi = contractAbiModule.abi;

			// Create contract instance
			const contract = new Contract(contractAbi, CONTRACT_ADDRESS, $walletAccount);

			// Call fetch_user function
			const response = await contract.call('fetch_user', [$walletAddress]);

			// Update user state
			const result = response as unknown as { amount: bigint; date: bigint; user_address: bigint };
			$userState = {
				amount: result.amount,
				date: result.date,
				user_address: result.user_address
			};
			console.log('User state:', result);

			return response;
		} catch (error) {
			console.error('Error fetching user data:', error);
			alert(
				'Failed to fetch user data: ' + (error instanceof Error ? error.message : String(error))
			);
		}
	}

	// Fetch subscription amount
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

	// Handle ERC20 token approval
	// async function handleApprove() {
	// 	if (!$walletAccount) {
	// 		alert('Please connect your wallet first');
	// 		return false;
	// 	}

	// 	try {
	// 		// Get subscription amount first
	// 		const subscription_amount = await fetchSubscriptionAmount();
	// 		if (!subscription_amount) {
	// 			throw new Error("Couldn't fetch subscription amount");
	// 		}

	// 		// Handle uint256 representation (low and high parts)
	// 		const amountBigInt = BigInt(subscription_amount.toString());
	// 		const LOW_PART = BigInt(2) ** BigInt(128);
	// 		const low = (amountBigInt % LOW_PART).toString(); // Low 128 bits
	// 		const high = (amountBigInt / LOW_PART).toString(); // High 128 bits

	// 		// Import ERC20 ABI
	// 		const erc20AbiModule = await import('$lib/dev/erc-contreact-class.json');
	// 		const erc20Abi = erc20AbiModule.abi;

	// 		// Create ERC20 contract instance
	// 		const { Contract } = await import('starknet');
	// 		const erc20Contract = new Contract(erc20Abi, STRK_TOKEN_ADDRESS, $walletAccount);

	// 		// Approve spending
	// 		const approveCall = erc20Contract.populate('approve', [CONTRACT_ADDRESS, low, high]);
	// 		const response = await $walletAccount.execute(approveCall);

	// 		console.log('Approve transaction:', response);

	// 		// Wait for transaction confirmation
	// 		const { TransactionExecutionStatus, RpcProvider } = await import('starknet');
	// 		const provider = new RpcProvider({ nodeUrl: RPC_URL });
	// 		const receipt = await provider.waitForTransaction(response.transaction_hash, {
	// 			successStates: [TransactionExecutionStatus.SUCCEEDED]
	// 		});
	// 		console.log('Approval confirmed:', receipt);

	// 		return true;
	// 	} catch (error) {
	// 		console.error('Approval failed:', error);
	// 		alert(
	// 			'Failed to approve token spending: ' +
	// 				(error instanceof Error ? error.message : String(error))
	// 		);
	// 		return false;
	// 	}
	// }

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

	// Handle subscription
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

			// Refresh user data after subscription
			await fetchUserData();

			return receipt;
		} catch (error) {
			console.error('Subscription failed:', error);
			alert('Failed to subscribe: ' + (error instanceof Error ? error.message : String(error)));
		}
	}

	// Helper functions
	function truncateString(text: string, charsAtStart = 6, charsAtEnd = 4) {
		if (!text) return '';

		if (text.length <= charsAtStart + charsAtEnd) {
			return text;
		}

		const hasHexPrefix = text.startsWith('0x');
		const actualStart = hasHexPrefix ? Math.max(2, charsAtStart) : charsAtStart;

		const start = text.substring(0, hasHexPrefix ? actualStart + 2 : actualStart);
		const end = text.substring(text.length - charsAtEnd);

		return `${start}...${end}`;
	}

	function formatTimestamp(timestamp: bigint | string | number, includeTime = true) {
		const timestampNum =
			typeof timestamp === 'bigint' || typeof timestamp === 'string'
				? Number(timestamp)
				: timestamp;

		const date = new Date(timestampNum * 1000);

		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		};

		if (includeTime) {
			options.hour = '2-digit';
			options.minute = '2-digit';
			options.second = '2-digit';
			options.timeZoneName = 'short';
		}

		return date.toLocaleDateString(undefined, options);
	}
</script>

<div class="container">
	<h1>StarkNet Subscription</h1>

	<div class="card">
		<button
			class="btn primary {$isConnected ? 'connected' : ''}"
			on:click={() => ($isConnected ? disconnectWallet() : connectWallet())}
			disabled={$isConnecting}
		>
			{#if $isConnecting}
				Connecting...
			{:else if $isConnected}
				{$walletAddress ? truncateString($walletAddress) : ''}
			{:else}
				Connect Wallet
			{/if}
		</button>

		{#if $isConnected}
			<div class="action-buttons">
				<button class="btn" on:click={fetchUserData}> Fetch Current User </button>

				<button class="btn" on:click={handleApprove}> Handle Approve </button>

				<button class="btn" on:click={handleSubscribe}> Subscribe for Streaming </button>
			</div>
		{/if}
	</div>

	{#if $userState}
		<div class="user-card">
			<div class="__user_amount">
				<span class="label">Amount Paid:</span>
				<span class="value">{Number($userState.amount)}</span>
			</div>

			<div class="__user_amount">
				<span class="label">Subscription Ends: </span>
				<span class="value">
					{new Date(Number($userState.date) * 1000).toLocaleString()}
				</span>
			</div>

			<div class="__user_amount">
				<span class="label">User Address:</span>
				<span class="value">0x {$userState.user_address.toString(16).padStart(64, '0')}</span>
			</div>
		</div>
	{/if}
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			sans-serif;
	}

	h1 {
		font-size: 1.8rem;
		margin-bottom: 1.5rem;
		color: white;
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 1024px;
		overflow-x: hidden;
		background-color: black;
		padding: 1.5rem;
		border-radius: 0.5rem;
		box-shadow:
			0 1px 3px 0 rgba(0, 0, 0, 0.1),
			0 1px 2px 0 rgba(0, 0, 0, 0.06);
	}

	.btn {
		padding: 0.625rem 1rem;
		font-size: 0.875rem;
		font-weight: 500;
		border-radius: 0.375rem;
		border: 1px solid black;
		background-color: black;
		color: white;
		cursor: pointer;
		transition: all 0.2s;
	}

	.btn:hover {
		background-color: black;
	}

	.btn.primary {
		background-color: #3b82f6;
		color: black;
		border: none;
	}

	.btn.primary:hover {
		background-color: #2563eb;
	}

	.btn.primary.connected {
		background-color: #10b981;
	}

	.btn.primary.connected:hover {
		background-color: #059669;
	}

	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.action-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.user-card {
		margin-top: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1.5rem;
		font-weight: 900;
		background-color: blacl;
		border-radius: 1rem;
		min-height: 16rem;
		height: fit-content;
		color: #111827;
		max-width: 20rem;
	}

	.__user_amount {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.label {
		font-size: 0.875rem;
		color: white;
	}

	.value {
		font-size: 1rem;
		word-break: break-all;
		color: grey;
	}
</style>
