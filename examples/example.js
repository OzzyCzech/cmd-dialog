import 'https://esm.run/cmd-dialog'; // eslint-disable-line import/no-unassigned-import

const dialog = document.querySelector('cmd-dialog');

// Add custom actions
dialog.actions = [
	{
		title: 'Dark theme',
		description: 'Dark theme example',
		url: '/dark.html',
	},
	{
		title: 'Light theme',
		description: 'Light theme example',
		url: '/light.html',
	},
	{
		title: 'Custom footer',
		description: 'Customize the footer',
		url: '/footer.html',
	},
	{
		title: 'Styles',
		description: 'Customize the styles',
		url: '/styles.html',
	},
];
