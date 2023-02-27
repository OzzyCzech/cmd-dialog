import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		target: 'esnext',
		sourcemap: true,
		lib: {
			entry: 'src/cmd-dialog.ts',
			formats: ['es'],
		},
		rollupOptions: {
			external: /^lit/,
		},
	},
});
