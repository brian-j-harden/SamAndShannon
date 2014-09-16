"use strict";

var config   = require( 'config' );
var redis    = require( 'redis' );
var instance = null;
var redisConfig;
var getClientInstance = function() {
	// if there isn't an instance already create one
	// otherwise return the created instance
	if( !instance ) {
		// overriding local config vars if we are in stackato
		if ( !!config.redis.useVCAP && process.env.VCAP_SERVICES ) {
			redisConfig       = JSON.parse( process.env.VCAP_SERVICES );
			redisConfig       = ( redisConfig[ 'redis-2.6' ] || redisConfig[ 'redis-2.4' ] || redisConfig.redis )[0];
			config.redis.host = redisConfig.credentials.host;
			config.redis.port = redisConfig.credentials.port;
			config.redis.pass = redisConfig.credentials.password;
		}

		// creating redis client
		instance = redis.createClient( config.redis.port, config.redis.host );

		// authenicating into redis with password from VCAP_SERVICES
		if( !!config.redis.pass ) {
			instance.auth( config.redis.pass );
		}

		// displaying error if something goes wrong
		instance.on( 'error', function( err ) {
			console.log( "REDIS ERROR: " + err );
		});
	}

	// returning instance to be used by other apps
	return instance;
};

module.exports = getClientInstance();