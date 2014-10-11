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
        res.render('index', _.extend( defaultOptions, { title: 'Sam and Shannon', files: files }));
    })

    server.post('/saveMessage', function (req, res) {
        var message = req.body.message;
        var name = req.body.name;
        console.log('CALLED SAVED SUCCESSFULLY WITH: '+message+"/"+name);
        res.redirect('/');
    })
};
