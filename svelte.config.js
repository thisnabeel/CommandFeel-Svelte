import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import preprocessReact from 'svelte-preprocess-react/preprocessReact';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	preprocess: preprocessReact({
		preprocess: preprocess({ sourceMap: true })
	})
};

export default config;
