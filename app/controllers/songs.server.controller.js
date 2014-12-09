'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Song = mongoose.model('Song'),
	_ = require('lodash'),
	SpotifyWebApi = require('spotify-web-api-node'),
	spotifyApi = new SpotifyWebApi({
  		clientId : '',
  		clientSecret : ''
	});

spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    console.log('The access token expires in ' + data.expires_in);
    console.log('The access token is ' + data.access_token);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.access_token);
  }, function(err) {
        console.log('Something went wrong when retrieving an access token', err);
  });

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
			res.render('list', { songs: songs });
		}
	});
};

/**
 * Import songs
 */
exports.import = function(req, res) {
  spotifyApi.getPlaylistTracks('yaron', '5qtmbJOrYFGiku9jrge4en', { 'offset': 0, 'limit': 100, fields: 'items.track' })
  .then(function(data) {
    for (var song in data.items) {
      var title = data.items[song].track.name;
      var artists = data.items[song].track.artists.map(
        function(artist){
          return artist.name;
        }
      ).join(', ');
      var songID = data.items[song].track.id;
      
      var songObject = new Song({ songID: songID, title: title, artist: artists});
      songObject.save();
    }
    
    return res.status(200).send({
      message: 'Songs imported'
    });
  }, function(err) {
    return res.status(500).send({
      message: err
    });
  });
};

