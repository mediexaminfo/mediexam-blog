import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [preprocess({
		"postcss": true
	})],

	kit: {
		target: '#svelte',
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$src: path.resolve("./src"),
					$components: path.resolve("./src/components")
				},
			}
		}
	},
};

export default config;
