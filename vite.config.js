import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	kit: {
		vite: {
			ssr: {
				noExternal: ['@popperjs/core']
			}
		}
	},
	define: {
		'process.env': process.env
	}
};

export default config;
