'use strict';

module.exports = {
	app: {
		title: 'XMAS top 100',
		description: 'Vote for the top 100 of xmas songs!',
		keywords: 'xmas 100 vote spotify'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'XMAS',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/hammerjs/hammer.js',
				'public/lib/angular-aria/angular-aria.js',
				'public/lib/angular-material/angular-material.js'
			]
		},
		css: [
			'public/lib/angular-material/angular-material.css',
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
