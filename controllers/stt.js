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
    client
       .longRunningRecognize(request)
       .then(data => {
         const operation = data[0];
         // Get a Promise representation of the final result of the job
         return operation.promise();
       })
       .then(data => {
         const response = data[0];
         const transcription = response.results
           .map(result => result.alternatives[0].transcript)
           .join('\n');

         //TODO: save to db
         console.log('raw data: ' + data);
         console.log(`Transcription: ${transcription}`);
       })
       .catch(err => {
         console.error('ERROR:', err);
       });
  });



})
