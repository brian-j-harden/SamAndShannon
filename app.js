/**
 * Created by bharden on 9/11/14.
 */
var http    = require( 'http' );
var express     = require('express');
var exphbs      = require('express-handlebars');
var experrhndlr  = require('express-error-handler');
var hbsConfig   = require( './config/hbs-config' );
var hbs         = exphbs.create( hbsConfig );
var app         = express();

// getting main controller for routes
var mainController = require( './controllers/main' );

// adding custom middleweare
var lessCompiler = require( 'express-less-middleware' )();

// using express handlebars for templating
app.engine( 'handlebars', hbs.engine );
app.set('view engine', 'handlebars');
app.set('views_old', './views_old/');

app.use( express.static( 'public' ) );

app.use( lessCompiler );
app.use( experrhndlr( { dumpException: true, showStack: true } ) );

// configuring routes here. edit inside ./controllers/main.js to add routes
mainController( app );

http.createServer( app ).listen( process.env.PORT || 5000, function() {
    console.log('Listening on port %d', 5000);
} );

exports.app = app;
