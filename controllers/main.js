'use strict';

var indexController = require( './index' );
var errorHandler = require( './error-handlers' );
var testController = require( './test-can-remove' ); // you should remove this. just for unit tests

module.exports = function( server ) {
	// add more controllers here and the app will automatically pick up the new routes
	indexController( server );
	errorHandler( server );
	testController( server );
};