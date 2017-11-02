/* global app, path, Upload,  */

// This is the page for listing all the available boxes
// all the listings are passed along the to 'listings' view

app.get(  '/listings', function( request, response ) {
  db_Upload.getUploads(function(err, uploads){
    if(err){
      throw err;
    }

    // response.json(uploads);
    // TODO: format uploads and pass to templates
    response.render( 'listings', { listings: uploads } )
  });
})
