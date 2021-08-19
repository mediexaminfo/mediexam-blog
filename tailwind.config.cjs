const colors = require('tailwindcss/colors');

const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				'sans': ['"Baloo Da 2"', 'sans-serif']
			},
			colors: {
				primary: colors.indigo,
			},
			transitionDuration: {
				'3000': '3000ms',
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};

module.exports = config;
