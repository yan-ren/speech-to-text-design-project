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
  const gcsUri = 'gs://speech-to-text-sandbox/fr_2m6s.flac';
  const encoding = 'FLAC';
//  const sampleRateHertz = 48000;
  //  	fr-CA en-US
  const languageCode = 'fr-CA';

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

client
  .longRunningRecognize(request)
  .then(data => {
    const operation = data[0];
    // Get a Promise representation of the final result of the job
    return operation.promise();
  })
  .then(data => {
    const response = data[0];
    var subContent = "";
    response.results.forEach(result => {
      console.log(`Transcription: ${result.alternatives[0].transcript}`);
      subContent = subContent + result.alternatives[0].transcript;
      result.alternatives[0].words.forEach(wordInfo => {
        // NOTE: If you have a time offset exceeding 2^32 seconds, use the
        // wordInfo.{x}Time.seconds.high to calculate seconds.
        const startSecs =
          `${wordInfo.startTime.seconds}` +
          `.` +
          wordInfo.startTime.nanos / 100000000;
        const endSecs =
          `${wordInfo.endTime.seconds}` +
          `.` +
          wordInfo.endTime.nanos / 100000000;
        console.log(`Word: ${wordInfo.word}`);
        console.log(`\t ${startSecs} secs - ${endSecs} secs`);

      });
    });
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

// client.longRunningRecognize(request)
//   .then(responses => {
//     var operation = responses[0];
//     var initialApiResponse = responses[1];
//
//     // Adding a listener for the "complete" event starts polling for the
//     // completion of the operation.
//     operation.on('complete', (result, metadata, finalApiResponse) => {
//       console.log('result');
//       console.log(JSON.stringify(result));
//       // console.log('metadata');
//       // console.log(JSON.stringify(metadata));
//       // console.log('finalApiResponse');
//       // console.log(JSON.stringify(finalApiResponse));
//     });
//
//     // Adding a listener for the "progress" event causes the callback to be
//     // called on any change in metadata when the operation is polled.
//     operation.on('progress', (metadata, apiResponse) => {
//       // doSomethingWith(metadata)
//     });
//
//     // Adding a listener for the "error" event handles any errors found during polling.
//     operation.on('error', err => {
//       // throw(err);
//     });
//   })
//   .catch(err => {
//     console.error(err);
//   });

// method 2
//   client.longRunningRecognize(request)
//      .then(data => {
//        const operation = data[0];
//        // Get a Promise representation of the final result of the job
//        return operation.promise();
//      })
//      .then(data => {
//        const response = data[0];
//        const transcription = response.results
//          .map(result => result.alternatives[0].transcript)
//          .join('\n');
//
//        //TODO: save to db
//        console.log('raw data: ' + data);
//        console.log(`Transcription: ${transcription}`);
// /*
// raw data: .google.cloud.speech.v1.LongRunningRecognizeResponse,.google.cloud.speech.v1.LongRunningRecognizeMetadata,[object Object]
// Transcription: the more than half a Century men and boys I've been picking up at the Australian political scene like an office on the garbage bin and now it is for the hot both heavy and light that I approach the microphone for what is the last time looking back at the political week and the last time on it I am at the end of 42 years is a journalist which began on a summer Monday morning at the end of 1975 when I walk into Rupert Murdoch's news limited building took the list to the 4th floor turn left and left into the partition Newsroom of the Daily Telegraph and joined in what was then in part the demolition of the few remaining shattered Parts the half pillars of the whitlam government
// */
//      })
//      .catch(err => {
//        console.error('ERROR:', err);
//      });
