'use strict';

var config = require( 'config' );
var _      = require( 'underscore' );
var fs      = require( 'fs' );

var defaultOptions = {
	title: 'Sam and Shannon',
    compiled: true
};

module.exports = function( server ) {

    // routing to templates
    server.get('/hello.txt', function(req, res){
        res.send('Hello World');
    });

    server.get('/hi', function (req, res) {
        res.render('hello', _.extend( defaultOptions, { title: 'Hey', message: 'Hello there fred!'}));
    })

    server.get('/', function (req, res) {
        var files = fs.readdirSync('././public/img/photos/');
        console.log('Got files: '+files);
        res.render('index', _.extend( defaultOptions, { title: 'index time', files: files }));
    })
};
