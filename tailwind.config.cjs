const plugin = require('tailwindcss/plugin');

module.exports = {
	content: ['src/**/*.{ts,html}'],
	theme: {
		extend: {},
	},
	darkMode: 'class', // or 'media' or 'class'
	plugins: [
		require('@tailwindcss/forms'),
		plugin(function ({addComponents}) {
			addComponents({
				'.debug': {
					outline: '1px dashed red',
				},
			});
		}),
	],
};