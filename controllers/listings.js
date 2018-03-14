/* global app, path, Upload,  */

// This is the page for listing all the available boxes
// all the listings are passed along the to 'listings' view

app.get(  '/media', function( req, res ) {
  db_Media.getAllMedia(function(err, media){
    if(err){
      throw err;
    }

//    res.json(media);
    res.render( 'listings', { listings: media } )
  });
})

app.get(  '/media/:id', function( req, res ) {
  db_Media.getMediaById( req.params.id, function(err, media){
    if(err){
      throw err;
    }

    res.json(media);
    // response.render( 'listings', { listings: media } )
  });
})
