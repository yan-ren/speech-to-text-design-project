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

        db_Sub.addSub({
            media_id: req.body.id,
    //               content: JSON.stringify(res, null, 2)
            content: subContent
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
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  });



})
