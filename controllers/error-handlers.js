'use strict';

module.exports = function( server ) {
	// 500 Error Handling
	server.use( function( err, req, res, next ) {
		var errorCode = err.status || 500;
		res.status( errorCode );
		res.render( 'error500', {
			layout: 'errors',
			errorCode: errorCode,
			errorMsg: 'Server Error'
		});
		next( err );
	});
};