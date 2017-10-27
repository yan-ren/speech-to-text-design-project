/* global app, database */

// This is the page for listing all the available boxes
// all the listings are passed along the to 'listings' view

app.get(  '/listings', function( request, response ) {
  response.render( 'listings', { listings: database.listings } )
})