'use strict';

var config = require( 'config' );
var _      = require( 'underscore' );

var defaultOptions = {
	title: 'email-transactional-app | by ExactTarget',
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
		var mid = null;
		var eid = null;
        var appId = null;

		if (req.session.fuel) {
			mid = req.session.fuel.mid;
			eid = req.session.fuel.eid;
            appId = config.fuelConfigs[req.session.fuel.stackKey].appId;
		} else {
            appId = config.fuelConfigs.QA1S1.appId;
        }

		res.render( 'index', _.extend( defaultOptions, { csrfToken: req.csrfToken(), mid: mid, eid: eid, appId:  appId } ) );
	});

	server.post( '/', function( req, res ) {
		var mid = null;
		var eid = null;
        var appId = null;

		if (req.session.fuel) {
			mid = req.session.fuel.mid;
			eid = req.session.fuel.eid;
            appId = config.fuelConfigs[req.session.fuel.stackKey].appId;
		} else {
            appId = config.fuelConfigs.QA1S1.appId;
        }

		res.render( 'index', _.extend( defaultOptions, { csrfToken: req.csrfToken(), mid: mid, eid: eid, appId:  appId } ) );

	});

	server.get( '/harness', function( req, res ) {
		res.render('harness', {});
	});
};