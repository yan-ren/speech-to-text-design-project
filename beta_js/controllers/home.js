/* global app, database */

// This is the Home controller

// app.get is how we listen for GET requests
// There are 2 types of requests defined in the Hyper Text Transfer Protocol (HTTP)
// GET requests are the standard request issued by your browser
// POST requests, which we'll see later, can have additional data attached to them, called the Request Body

// Here we listen to the path '/', which is the homepage
// Express gives us a request and a response object
// We call 'render' on the response object with the 'home' view as its argument
// Express generates the response HTML from the file 'views/home.ejs'

app.get(  '/', function( request, response ) {
  response.render( 'home' );
})
