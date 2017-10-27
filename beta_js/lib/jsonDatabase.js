/* global app, database */

function jsonDatabase( filename ) {
  
  var fs = require( 'fs' );

  app.use( function( request, response, next ) {
    loadDatabase();
    response.on( 'finish', function() { saveDatabase() } );
    next();
  } )

  function loadDatabase() {
    database = JSON.parse( fs.readFileSync( filename ) );
  }

  function saveDatabase() {
    fs.writeFileSync( filename, JSON.stringify( database, null, 2 ) );
  }
  
  return {};

}

module.exports = jsonDatabase;