import preprocess from 'svelte-preprocess';
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [preprocess({
		"postcss": true
	})],

	kit: {
		target: '#svelte',
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
