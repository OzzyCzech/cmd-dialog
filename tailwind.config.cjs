const plugin = require("tailwindcss/plugin");

module.exports = {
	content: ["src/**/*.{ts,html}"],
	theme: {
		extend: {},
	},
	darkMode: "class", // Or 'media' or 'class'
	plugins: [
		require("@tailwindcss/forms"),
		plugin(({ addComponents }) => {
			addComponents({
				".debug": {
					outline: "1px dashed red",
				},
			});
		}),
	],
};
