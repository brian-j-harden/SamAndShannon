'use strict';

var config = require( 'config' );
var _      = require( 'underscore' );

var defaultOptions = {
	title: 'Sam and Shannon',
    compiled: true
};

module.exports = function( server ) {

    // routing to templates
    server.get('/hello.txt', function(req, res){
        res.send('Hello World');
    });

    server.get('/', function (req, res) {
        res.render('hello', _.extend( defaultOptions, { title: 'Hey', message: 'Hello there fred!'}));
    })

    server.get('/2', function (req, res) {
        res.render('index', _.extend( defaultOptions, { title: 'index time' }));
    })


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
};
