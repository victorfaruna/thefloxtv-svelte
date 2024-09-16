/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {
				'2xl': { max: '1535px' },
				// => @media (max-width: 1535px) { ... }
				xl: { max: '1279px' },
				// => @media (max-width: 1279px) { ... }
				lg: { max: '1023px' },
				// => @media (max-width: 1023px) { ... }
				md: { max: '767px' },
				// => @media (max-width: 767px) { ... }
				sm: { max: '639px' }
				// => @media (max-width: 639px) { ... }
			},
			colors: {
				main: 'rgba(var(--bg-color-1))',
				sec: 'rgba(var(--bg-color-2))',
				tet: 'rgba(var(--bg-color-3))',
				'color-1': 'rgba(var(--color-1))',
				'color-2': 'rgba(var(--color-2))',
				'color-3': 'rgba(var(--color-3))',
				'color-4': 'rgba(var(--color-4))'
			}
		}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['light', 'dark'],
		base: false,
		utils: true,
		logs: true,
		rtl: false,
		prefix: '',
		styled: true
	}
};
