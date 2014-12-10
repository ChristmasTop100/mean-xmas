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
	}),
        lastImport = 0,
        importedSongs = 0,
        totalSongs = 0,
        tokenValidTill = 0,
        refreshSongs = false;

var checkAuthentication = function() {
  // If needed fetch a new token from spotify (valid for 1 hour).
  if ((new Date().getTime() - 6000) > tokenValidTill) {
    console.log('Requesting credentials');
    spotifyApi.clientCredentialsGrant()
      .then(function(data) {                                                                                                                          
        tokenValidTill = new Date().getTime() + data.expires_in;
        console.log('The access token expires on ' + tokenValidTill);

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.access_token);
        return true;
      });
  }
  else {
    console.log('token still valid');
  }
  return false;
};

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
  // If the token needs to be refreshed, we'll also refresh the songs.
  if (checkAuthentication()) {
    // Delete all songs that exist in the database.
    Song.find().remove(function(err){
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      else {
        importedSongs = 0;
      }
    });
  }

  console.log(importedSongs + ' Songs imported, now importing the next 100');
  // Fetch all songs from our playlist and import them in the database.
  spotifyApi.getPlaylistTracks('yaron', '5qtmbJOrYFGiku9jrge4en', { 'offset': importedSongs, 'limit': 100, fields: 'items.track' })
    .then(function(data) {
      for (var song in data.items) {
        var title = data.items[song].track.name;

        // A song can have multiple artists, so we need to join the names together.
        var artists = data.items[song].track.artists.map(
          function(artist){
            return artist.name;
          }
        ).join(', ');
        var songID = data.items[song].track.id;
      
        var songObject = new Song({ songID: songID, title: title, artist: artists});
        songObject.save();
      }
      importedSongs += 100;
      return res.status(200).send({
        message: 'Songs imported'
      }, function(err) {console.log(err);});
    }, function(err){console.log(err);});
  return res.status(200).send({
    message: 'Working on it'
  });
};
