'use strict';

var config = require( 'config' );
var _      = require( 'underscore' );
var fs      = require( 'fs' );
var pg      = require( 'pg' );

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
        insertMessage(message, name);
        res.redirect('/');
    })
};

function getMessages() {
    pg.connect("pg://rmfvwcxhwdcqrj:RoQl5sSBW5a_B0gR8DVNtBwTpM@ec2-54-243-51-102.compute-1.amazonaws.com:5432/dfuc1t0msd4kpv?ssl=true", function(err, client, done) {

        client.query(
            'select message, name from wishes',
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('row inserted.');
                }

                console.log('Client will end now!!!');
                client.end();
            });
    });
}

function insertMessage(message, name) {

    pg.connect("pg://rmfvwcxhwdcqrj:RoQl5sSBW5a_B0gR8DVNtBwTpM@ec2-54-243-51-102.compute-1.amazonaws.com:5432/dfuc1t0msd4kpv?ssl=true", function(err, client, done) {

        client.query(
            'INSERT INTO wishes (message, name) VALUES ($1, $2)',
            [message, name],
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('row inserted.');
                }

                console.log('Client will end now!!!');
                client.end();
            });
    });
}
