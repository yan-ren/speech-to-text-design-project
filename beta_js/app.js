/*global app, path*/

// Express is a framework for accepting HTTP requests and generating HTML responses
var express      = require('express');
// BodyParser reads form submissions
var bodyParser   = require('body-parser');
// RequireGlob imports all our controllers
var requireGlob  = require('require-glob');
// JsonDatabase sets up a JSON file as our database
// var jsonDb       = require('./lib/jsonDatabase');
// Mongodb
var mongoose = require('mongoose');

global.path = require('path');
// Here we define the application instance
global.app  = express();
// And here we define the database connection
// global.database  = jsonDb( 'database.json' );

// Connect to Mongoose
mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true });
var db = mongoose.connection;

global.db_Upload = require('./models/upload')
global.db_Srt = require('./models/srt')

// Now we listen for incoming requests
app.listen( process.env.PORT || 8000);
// Support EJS templates http://ejs.co
app.set( 'view engine', 'ejs' )
// Make the /public folder available for download
app.use( express.static( 'public' ) );
//support parsing of application/json type post data
app.use(bodyParser.json());
// Read information encoded in the request body ( Mostly forms )
app.use( bodyParser.urlencoded( { extended: true } ) );

// import all the controllers
requireGlob( './controllers/*' )
