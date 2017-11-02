/* global app, db_Upload, db_Srt, path */

const Speech = require('@google-cloud/speech');
const fs = require('fs');

// Your Google Cloud Platform project ID
const projectId = 'your-project-id';

// Instantiates a client
const speechClient = Speech({
  projectId: projectId
});

// This function receives id and do following:
// read file path from db by using id
// sends file to google api and receives result
// save result to db_Srt
app.get(  '/translate/google/:id', function( request, response ) {
  var id   = request.params.id;
  db_Upload.getUploadById(id, function(err, upload){
    if(err){
      throw err;
    }
    // The name of the audio file to transcribe
    const fileName = upload.url;

    // Reads a local audio file and converts it to base64
    const file = fs.readFileSync(fileName);
    const audioBytes = file.toString('base64');

    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
      content: audioBytes
    };
    const config = {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US'
    };
    const request = {
      audio: audio,
      config: config
    };

    // Detects speech in the audio file
    speechClient.recognize(request)
      .then((data) => {
        const response = data[0];
        const transcription = response.results.map(result =>
            result.alternatives[0].transcript).join('\n');
        console.log(`Transcription: ${transcription}`);
      })
      .catch((err) => {
        console.error('ERROR:', err);
    });
  });
  // response.render( 'review', {
  //   listing: database.listings[ id ],
  // });
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
