import { writable } from 'svelte/store';
import type { WalletAccount } from 'starknet';

export const walletAccount = writable<WalletAccount | null>(null);
export const walletAddress = writable<string>('');
export const isSubscribed = writable(false);
export const isConnected = writable(false);
export const isConnecting = writable(false);
