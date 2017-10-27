/* global app, database */

// server.js
// where your node app starts

// First we require all the libraries we want to use

// Express is a framework for accepting HTTP requests and generating HTML responses
var express      = require('express');
// BodyParser reads form submissions
var bodyParser   = require('body-parser');
// RequireGlob imports all our controllers
var requireGlob  = require('require-glob');
// JsonDatabase sets up a JSON file as our database
var jsonDb       = require('./lib/jsonDatabase');

// Here we define the application instance
global.app       = express();
// And here we define the database connection
global.database  = jsonDb( 'database.json' );

// Now we listen for incoming requests
app.listen( process.env.PORT || 8080);
// Support EJS templates http://ejs.co
app.set( 'view engine', 'ejs' )
// Make the /public folder available for download
app.use( express.static( 'public' ) );
// Read information encoded in the request body ( Mostly forms )
app.use( bodyParser.urlencoded( { extended: true } ) );

// import all the controllers
requireGlob( './controllers/*' )
