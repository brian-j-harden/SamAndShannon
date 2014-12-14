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
        var isSubmitted = req.session.isSubmitted;
        if (typeof isSubmitted === "undefined") {
            isSubmitted = 0;
        }

        getMessages(function(wishesJson) {
            res.render('index', _.extend( defaultOptions, { title: 'Sam and Shannon', files: files, savedWishes: wishesJson, submitted: isSubmitted }));
        });

    })

    server.post('/saveMessage', function (req, res) {
        var message = req.body.message;
        var name = req.body.name;
        insertMessage(message, name, function() {
            req.session.isSubmitted = '1';
            res.redirect('/');
        });
    })
};

function getMessages(callback) {

;   var wishesJson = '{"wishes":[';
    var firstEntry = true;

    pg.connect("pg://rmfvwcxhwdcqrj:RoQl5sSBW5a_B0gR8DVNtBwTpM@ec2-54-243-51-102.compute-1.amazonaws.com:5432/dfuc1t0msd4kpv?ssl=true", function(err, client, done) {

        var messageQuery = client.query(
            'select message, name from wishes',
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('retrieved wishes.');
                }
                client.end();
            });

        //can stream row results back 1 at a time
        messageQuery.on('row', function(row) {
            if (!firstEntry) {
                wishesJson += ',';
            }
            wishesJson += '{"message":"'+row.message+'","name":"'+row.name+'"}';
            firstEntry = false;
        });

        //fired after last row is emitted
        messageQuery.on('end', function() {
            client.end();
            wishesJson += ']}';

            // Callback
            // Make sure the callback is a function​
            if (typeof callback === "function") {
                // Call it, since we have confirmed it is callable​
                callback(wishesJson);
            }
        });
    });
}

function insertMessage(message, name, callback) {

    message = message.replace(/"/g, "'").replace(/(\r\n|\n|\r)/g,"<br>");

    pg.connect(process.env.DATABASE_URL || "pg://rmfvwcxhwdcqrj:RoQl5sSBW5a_B0gR8DVNtBwTpM@ec2-54-243-51-102.compute-1.amazonaws.com:5432/dfuc1t0msd4kpv?ssl=true", function(err, client, done) {

        client.query(
            'INSERT INTO wishes (message, name) VALUES ($1, $2)',
            [message, name],
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('wish inserted.');
                }
                client.end();

                // Callback
                // Make sure the callback is a function​
                if (typeof callback === "function") {
                    // Call it, since we have confirmed it is callable​
                    callback();
                }

            });
    });
}
