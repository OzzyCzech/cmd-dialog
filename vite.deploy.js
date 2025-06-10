import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/cmd-dialog/",
	build: {
		target: "esnext",
		outDir: "dist",
	},
	publicDir: "examples",
});
