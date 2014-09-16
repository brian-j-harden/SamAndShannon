/**
 * Created by bharden on 9/11/14.
 */
'use strict';

var config  = require( 'config' );

var pkg     = require( './package.json' );
var http    = require( 'http' );
var express = require( 'express' );

var app     = express();

// express handlebars setup
var exphbs    = require( 'express3-handlebars' );
var hbsConfig = require( './../lib/hbs-config' );
var hbs       = exphbs.create( hbsConfig );

// getting main controller for routes
var mainController = require( './../controllers/main' );

// adding custom middleweare
var lessCompiler = require( 'express-less-middleware' )();

// redis session store
var sessionStore;
if( config.session.useRedisStore ) {
    var RedisStore                 = require( 'connect-redis' )( express );
    var redisClient                = require( './../lib/redis-client' );
    var sessionExpirationInSeconds = 8 * 3600; // 8 hours
    sessionStore                   = new RedisStore({ client: redisClient, ttl: sessionExpirationInSeconds });
} else {
    sessionStore = new express.session.MemoryStore();
}

app.configure( function() {
    // Webfonts need mime types, too!
    express.static.mime.define( { 'application/x-font-woff': [ 'woff' ] } );
    express.static.mime.define( { 'application/x-font-ttf': [ 'ttf' ] } );
    express.static.mime.define( { 'application/vnd.ms-fontobject': [ 'eot' ] } );
    express.static.mime.define( { 'font/opentype': [ 'otf' ] } );
    express.static.mime.define( { 'image/svg+xml': [ 'svg' ] } );

    // gzipping
    app.use( express.compress() );

    // setting port correctly
    app.set( 'port', process.env.PORT || config.port );

    // using express3 handlebars for templating
    app.engine( 'handlebars', hbs.engine );
    app.set( 'view engine', 'handlebars' );
    app.set( 'views_old', __dirname + '/views_old/' );

    // serving front-facing app from static place
    // include before any middleware unnecessary for static files
    app.use( express.static( __dirname + config.ui.publicDir ) );
    app.use( '/bower_components', express.static(__dirname + '/bower_components'));
    app.use('/fonts', express.static(__dirname + '/bower_components/fuelux/dist/fonts'));
    app.use( '/img', express.static(__dirname + config.ui.publicDir + '/img'));
    app.use( '/img', express.static(__dirname + config.ui.publicDir + '/img/component-images'));

    // allowing express to behave like a RESTful app
    app.use( express.methodOverride() );
    app.use( express.cookieParser() );

});

if ( config.session.useLessCompiler ) {
    app.use( lessCompiler );
    app.use( express.errorHandler( { dumpException: true, showStack: true } ) );
}


app.configure( 'prod', function() {
    console.log( 'Running '+ pkg.name +' in production mode' );
});

// configuring routes here. edit inside ./controllers/main.js to add routes
mainController( app );

// using router middleware
app.use( app.router );

http.createServer( app ).listen( app.get( 'port' ) );
console.log( 'Express server for '+ pkg.name +' started on port %d in %s mode', app.get( 'port' ), process.env.NODE_ENV || 'local' );

exports.app = app;