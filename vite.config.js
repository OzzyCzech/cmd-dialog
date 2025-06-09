import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		target: "esnext",
		css: {
			devSourcemap: true,
		},
		lib: {
			name: "cmd-dialog",
			entry: ["src/cmd-dialog.ts"],
			formats: ["es"],
		},
		rollupOptions: {
			external: /^lit/,
		},
	},
});
