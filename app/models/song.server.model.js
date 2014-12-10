'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Song Schema
 */
var SongSchema = new Schema({
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
        artist: {
                type: String,
                default: '',
                trim: true,
                required: 'Artist cannot be blank'
        },
	songID: {
                type: String,
                default: '',
                trim: true,
                required: 'SongID cannot be blank'
        },
        score: {
                type: Number,
                default: 0
        }
});

mongoose.model('Song', SongSchema);
