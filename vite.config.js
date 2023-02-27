import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		target: 'esnext',
		sourcemap: true,
		lib: {
			name: 'cmd-dialog',
			entry: 'src/cmd-dialog.ts',
			formats: ['es'],
		},
		rollupOptions: {
			input: {
				app: 'index.html',
			},
			external: ['lit'],
		},
	},
});
