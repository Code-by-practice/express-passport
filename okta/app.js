'use strict';

var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var compression = require('compression');
var session = require('express-session');

/**
 * Create an express app;
 */
let app = express();

/**
 * For parsing application/json
 */
app.use(bodyParser.json());

/**
 * For parsing application/x-www-form-urlencoded
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Gzip compressing can greatly decrease the size of the response body
 * and hence increase the speed of a web app.
 */
app.use(compression());
app.use(session({ secret: 'authenticate-test' }));
app.use(passport.initialize());
app.use(passport.session());

app.set('port', process.env.PORT || 8000);
app.set('uri', '127.0.0.1');

/**
 * Service routes for Authentication
 */
app.post('/authenticate', function(req, res, next) {
  var _reqPayload = req.body;
  console.log('Log:: Okta username: ', _reqPayload.email);
  console.log('Log:: Okta password: ', _reqPayload.password);

  res.status(200).json({
    "isAuthenticated": true
  });
});

/**
 * Routes error handling
 */
app.use((error, req, res, next) => {
  res.status(500).json(error);
});

module.exports = app;
