import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		target: "esnext",
		outDir: "dist",
	},
	publicDir: "examples",
});
