import 'https://esm.run/cmd-dialog';

const dialog = document.querySelector('cmd-dialog');

// add custom actions
dialog.actions = [
	{
		title: 'Dark theme example',
		url: '/dark.html',
	},
	{
		title: 'Light theme example',
		url: '/light.html',
	},
	{
		title: 'Remove footer',
		url: '/no-footer.html',
	},
	{
		title: 'Customize styles',
		url: '/styles.html',
	},
]