import {resolve} from 'node:path'
import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		target: 'esnext',
		build: {
			rollupOptions: {
				input: {
					main: resolve(__dirname, 'index.html'),
				},
			},
		},
	},
});
