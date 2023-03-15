import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: any = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default config;
