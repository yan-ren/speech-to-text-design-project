/* global app, path, Upload,  */

// This is the page for listing all the available boxes
// all the listings are passed along the to 'listings' view

app.get(  '/listings', function( request, response ) {
  db_Media.getAllMedia(function(err, media){
    if(err){
      throw err;
    }

    // response.json(uploads);
    response.render( 'listings', { listings: media } )
  });
})
