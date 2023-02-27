import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		target: 'esnext',
		lib: {
			name: 'cmd-dialog',
			entry: ['src/cmd-dialog.ts', 'demo.html'],
			formats: ['es'],
		}
	},
});
