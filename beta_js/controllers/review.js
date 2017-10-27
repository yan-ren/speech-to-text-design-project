/* global app, database */

// This is the page for submitting reviews of boxes.
// The box we are reviewing is specified by the :id property in the route
// We then use the id to select the appropriate listing from the database
// Which we then send to the 'review' view

app.get(  '/review/:id', function( request, response ) {
  var id   = request.params.id;
  
  response.render( 'review', {
    listing: database.listings[ id ],
  });
})

// This is the POST route for submitting a review. It is where the review form gets submitted

// We take the id from the route :id parameter.
// We take the form from the request body

// We then add the contents of the form to the appropriate location in the database

app.post( '/review/:id', function( request, response ) {
  var id   = request.params.id;
  var form = request.body;
  
  database.listings[ id ].reviews.unshift( form )

  response.redirect( '/box/' + id + '?reviewed=true')
});