/* global app, db_Upload, db_Sub, path */

const speech = require('@google-cloud/speech');
app.post('/stt/gcs', function( req, res ) {
  console.log('in gcs method');

  const keyFileLocation = path.join(__dirname, '..', 'speech-to-text-sandbox-9b4c51ccdb39.json');
  const client = speech.v1({
    keyFilename: keyFileLocation,
  });

  // const client = new speech.SpeechClient();

  /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // const gcsUri = 'gs://my-bucket/audio.raw';
    // const encoding = 'Eencoding of the audio file, e.g. LINEAR16';
    // const sampleRateHertz = 16000;
    // const languageCode = 'BCP-47 language code, e.g. en-US';
    const gcsUri = 'gs://speech-to-text-sandbox/news_44s.mp3';
    const encoding = 'LINEAR16';
    const sampleRateHertz = 16000;
    const languageCode = 'en-US';

    const config = {
      encoding: encoding,
      sampleRateHertz: sampleRateHertz,
      languageCode: languageCode,
    };

    const audio = {
      uri: gcsUri,
    };

    const request = {
      config: config,
      audio: audio,
  };
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
       console.log('raw data: ' + data);
       console.log(`Transcription: ${transcription}`);
     })
     .catch(err => {
       console.error('ERROR:', err);
     });

})
