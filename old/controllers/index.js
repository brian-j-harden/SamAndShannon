'use strict';

var config = require( 'config' );
var _      = require( 'underscore' );

var defaultOptions = {
	title: 'sam-and-shannon | by Brian Harden',
	ui: JSON.stringify( config.ui ),
    compiled: config.ui.compiled
};

module.exports = function( server ) {
	server.post( '/login', function( req, res ) {
		res.redirect( '/' );
	});

	server.get( '/logout', function( req, res ) {
        req.session.destroy(function () {
            res.clearCookie(config.session.key, { path: '/' });
            res.send({ 'Logout': true });
        });
	});

	server.get( '/', function( req, res ) {

		res.render( 'index', {} );
	});

	server.post( '/', function( req, res ) {

		res.render( 'index', {} );

	});

	server.get( '/harness', function( req, res ) {
		res.render('harness', {});
	});
};