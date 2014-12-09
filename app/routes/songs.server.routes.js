'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	songs = require('../../app/controllers/songs');

module.exports = function(app) {
	// Song Routes
	app.route('/').get(songs.list);
	app.route('/songs')
		.get(songs.list);

	app.route('/import')
                .get(songs.import);
};
