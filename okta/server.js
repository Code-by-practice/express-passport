'use strict';

var http = require('http');
var app = require('./app');

/**
 * Create HTTP server.
 * @param {object} app - express app
 */
var server = http.createServer(app);

/**
 * Event listener for HTTP server 'error' event.
 */
server.on('error', function(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	/**
	 * Handle specific listen errors with friendly message.
	 */
	switch (error.code) {
		case 'EACCES':
			console.error('\n Error: Requires elevated privileges.');
			break;

		case 'EADDRINUSE':
			console.error('\n Error: ' + app.get('port') + ' port is already in use.');
			break;

		default:
			throw error;
	}

	process.exit(1);
});

/**
 * Event listener for HTTP server 'listening' event.
 */
server.on('listening', function() {
	console.log(' Ready of Okta Authentication');
	console.log(' Web server is started on ' + app.get('uri') + ':' + app.get('port') + '\n');
});

/**
 * Listen on provided port, on all network interfaces.
 * @param {string} app.get('port') - port on which express server is listening
 */
server.listen(app.get('port'));
