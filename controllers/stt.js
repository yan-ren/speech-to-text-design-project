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
/*
raw data: .google.cloud.speech.v1.LongRunningRecognizeResponse,.google.cloud.speech.v1.LongRunningRecognizeMetadata,[object Object]
Transcription: the more than half a Century men and boys I've been picking up at the Australian political scene like an office on the garbage bin and now it is for the hot both heavy and light that I approach the microphone for what is the last time looking back at the political week and the last time on it I am at the end of 42 years is a journalist which began on a summer Monday morning at the end of 1975 when I walk into Rupert Murdoch's news limited building took the list to the 4th floor turn left and left into the partition Newsroom of the Daily Telegraph and joined in what was then in part the demolition of the few remaining shattered Parts the half pillars of the whitlam government
*/
       })
       .catch(err => {
         console.error('ERROR:', err);
       });
  });



})
