module.exports = {
	apps: [
		{
			name: 'webshot',
			script: 'build/index.js',
			watch: true,
			ignore_watch: ['node_modules', 'public'],
			max_memory_restart: '200M',
			autorestart: true,
		},
	],
};
