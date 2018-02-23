const speech = require('@google-cloud/speech');
const path = require('path');

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
  const gcsUri = 'gs://speech-to-text-sandbox/news_44s.flac';
  const encoding = 'FLAC';
//  const sampleRateHertz = 48000;
  //  	fr-CA en-US
  const languageCode = 'en-US';

  const config = {
    enableWordTimeOffsets: true,
    encoding: encoding,
    languageCode: languageCode,
  };

  const audio = {
    uri: gcsUri,
  };

  const request = {
    config: config,
    audio: audio,
};

client.longRunningRecognize(request)
  .then(responses => {
    var operation = responses[0];
    var initialApiResponse = responses[1];

    // Adding a listener for the "complete" event starts polling for the
    // completion of the operation.
    operation.on('complete', (result, metadata, finalApiResponse) => {
      console.log('result');
      console.log(JSON.stringify(result));
      console.log('metadata');
      console.log(JSON.stringify(metadata));
      console.log('finalApiResponse');
      console.log(JSON.stringify(finalApiResponse));
    });

    // Adding a listener for the "progress" event causes the callback to be
    // called on any change in metadata when the operation is polled.
    operation.on('progress', (metadata, apiResponse) => {
      // doSomethingWith(metadata)
    });

    // Adding a listener for the "error" event handles any errors found during polling.
    operation.on('error', err => {
      // throw(err);
    });
  })
  .catch(err => {
    console.error(err);
  });
