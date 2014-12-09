'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	songs = require('../../app/controllers/songs');

module.exports = function(app) {
	// Article Routes
	app.route('/songs')
		.get(songs.list);
};
