/* global app, db_Upload, db_Sub, path */

const speech = require('@google-cloud/speech');
app.post('/stt/gcs', function( req, res ) {

  const keyFileLocation = path.join(__dirname, '..', 'speech-to-text-sandbox-9b4c51ccdb39.json');
  const client = speech.v1({
    keyFilename: keyFileLocation,
  });


/**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const gcsUri = 'gs://my-bucket/audio.raw';
  // const encoding = 'Eencoding of the audio file, e.g. LINEAR16';
  // const sampleRateHertz = 16000;
  // const languageCode = 'BCP-47 language code, e.g. en-US';
  //const gcsUri = '';
  const encoding = 'FLAC';
//  const sampleRateHertz = 16000;
  const languageCodeUS = 'en-US';
  const languageCodeFR = 'fr-CA';

  var config = {
    enableWordTimeOffsets: true,
    encoding: encoding,
    languageCode: '',
  };

  db_Media.getMediaById( req.body.id, function(err, media){
    if(err){
      throw err;
    }

    if(media.language == 'english'){
      config.languageCode = languageCodeUS
    }
    if(media.language == 'french'){
      config.languageCode = languageCodeFR
    }
    var audio = {
      uri: media.uri,
    };
    console.log(config);
    console.log(audio);

    var request = {
      config: config,
      audio: audio,
    }
    client.longRunningRecognize(request)
      .then(responses => {
        var operation = responses[0];
        var initialApiResponse = responses[1];

        // Adding a listener for the "complete" event starts polling for the
        // completion of the operation.
        operation.on('complete', (result, metadata, finalApiResponse) => {
          // console.log('result: ');
          // console.log(JSON.stringify(result));
          // console.log('metadata: ');
          // console.log(JSON.stringify(metadata));
          // console.log('finalApiResponse: ');
          // console.log(JSON.stringify(finalApiResponse));
          // save to db srt collection
           db_Sub.addSub({
               media_id: req.body.id,
//               content: JSON.stringify(res, null, 2)
               content: result.results[0].alternatives[0].transcript
             }, function(err, doc){
               if(err){  throw err;  }

               // update db file collection
               // new: bool - if true, return the modified document rather than the original. defaults to false
               db_Media.updateMedia(req.body.id, {transcribe: true,
                                         sub: doc._id}, {new: false},
                                         function(err){
                                           if(err){  console.log(err); throw err;  }
                                         }
                                   );
             }); // addSub
           // response.send(JSON.stringify(res, null, 2));
           res.end('success');

        });

        // Adding a listener for the "progress" event causes the callback to be
        // called on any change in metadata when the operation is polled.
        operation.on('progress', (metadata, apiResponse) => {
          // doSomethingWith(metadata)
        });

        // Adding a listener for the "error" event handles any errors found during polling.
        operation.on('error', err => {
          throw(err);
        });
      })
      .catch(err => {
        console.error(err);
      });
  });



})
