import { writable } from 'svelte/store';

// Create a writable store with initial viewport dimensions
function createViewportStore() {
	const { subscribe, set } = writable({
		width: window.innerWidth,
		height: window.innerHeight
	});

	// Function to update the store when the viewport is resized
	const updateDimensions = () => {
		set({
			width: window.innerWidth,
			height: window.innerHeight
		});
	};

	// Attach resize event listener
	window.addEventListener('resize', updateDimensions);

	return {
		subscribe
	};
}

export const viewport = createViewportStore();
