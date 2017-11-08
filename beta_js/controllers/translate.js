/* global app, db_Upload, db_Sub, path */

var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');

var speech_to_text = new SpeechToTextV1({
  username: '46ffeb72-d072-41cc-aeab-e468ac2a634e',
  password: 'rJ1824kVUpLb'
});

// This function receives id and do following:
// read file path from db by using id
// sends file to google api and receives result
// save result to db_Srt
app.post(  '/translate', function( request, response ) {
  var id   = request.body.id;
  console.log('request body id: ', id);
  db_Media.getMediaById(id, function(err, upload){
    if(err){
      throw err;
    }
    // The name of the audio file to transcribe
    const fileName = upload.url;
    // console.log('get file: ', fileName);
    var params = {
      // From file
      audio: fs.createReadStream(fileName),
      content_type: 'audio/mp3',
      model: 'en-US_BroadbandModel'
    };

    speech_to_text.recognize(params, function(err, res) {
      if (err)
        response.status(400).json({ error: 'errors in translation api' })
      else{
        // save to db srt collection
        db_Sub.addSub({
            media_id: id,
            content: JSON.stringify(res, null, 2)
          }, function(err, doc){
            if(err){  throw err;  }

            // update db file collection
            // new: bool - if true, return the modified document rather than the original. defaults to false
            db_Media.updateMedia(id, {translated: true,
                                      srt: doc._id}, {new: false},
                                      function(err){
                                        if(err){  console.log(err); throw err;  }
                                      }
                                );
          })


        response.send(JSON.stringify(res, null, 2));
        // response.end('success');
      }

    });
  });
})

// This is the POST route for submitting a review. It is where the review form gets submitted

// We take the id from the route :id parameter.
// We take the form from the request body

// We then add the contents of the form to the appropriate location in the database

// app.post( '/review/:id', function( request, response ) {
//   var id   = request.params.id;
//   var form = request.body;
//
//   database.listings[ id ].reviews.unshift( form )
//
//   response.redirect( '/box/' + id + '?reviewed=true')
// });
