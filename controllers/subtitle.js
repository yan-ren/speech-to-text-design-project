/* global app, db_Upload, db_Sub, path */

app.get(  '/subtitle/:id', function( request, response ) {
  var id = request.params.id;
  // console.log('get id: ', id);
  db_Media.getMediaById(id, function(err, media){
    if(err){  throw err;  }

    db_Sub.getSubById(media.srt, function(err, sub){
      if(err){  throw err;  }
      // console.log('get sub: ', sub);
      response.render( 'subtitle', { subtitle: sub.content } )
    })

  });
})
