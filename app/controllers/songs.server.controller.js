'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Song = mongoose.model('Song'),
	_ = require('lodash');

/**
 * List of Songs
 */
exports.list = function(req, res) {
	Song.find().sort('title').exec(function(err, songs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(songs);
		}
	});
};

