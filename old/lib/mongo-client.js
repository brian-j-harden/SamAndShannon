/*jshint node:true*/
'use strict';

var config  = require( 'config' );
var MongoClient = require( 'mongodb' ).MongoClient;
var instance = null;
var mongoConfig;

function buildMongoConnectionString( configOpts ) {
	var connectionString = 'mongodb://';

	if( !!configOpts.user ) {
		connectionString += configOpts.user + ':';
	}

	if( !!configOpts.password ) {
		connectionString += configOpts.password + '@';
	}

	if( !!configOpts.host ) {
		connectionString += configOpts.host + ':';
	}

	if( !!configOpts.port ) {
		connectionString += configOpts.port + '/';
	}

	if( !!configOpts.dbname ) {
		connectionString += configOpts.dbname;
	}

	return connectionString;
}

var getClientInstance = function() {
	// only setting up mongo if there's not an instance already
	if( !instance ) {
		// getting stackato specific env variables for mongo
		if( !!config.mongo.useVCAP && process.env.VCAP_SERVICES ) {
			mongoConfig           = JSON.parse( process.env.VCAP_SERVICES );
			mongoConfig           = mongoConfig.mongo[0];
			config.mongo.host     = mongoConfig.credentials.host;
			config.mongo.port     = mongoConfig.credentials.port;
			config.mongo.user     = mongoConfig.credentials.username;
			config.mongo.password = mongoConfig.credentials.password;
		}

		// generating connection string for mongo
		config.mongo.connectionString = buildMongoConnectionString( config.mongo );

		// connecting to mongo
		MongoClient.connect( config.mongo.connectionString, function( err, db ) {
			if( err ) {
				console.log( 'MongoDB: ' + err );
			} else {
				instance = db;
				console.log( 'MongoDB: connection opened' );
				console.log( 'MongoDB: connection string --> ' + config.mongo.connectionString );
			}
		});
	}
	return instance;
};

module.exports = getClientInstance();