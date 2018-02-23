/* global app, db_Upload, db_Srt, path */

var formidable = require('formidable');
var fs = require('fs');
// Imports the Google Cloud client library
const Storage = require('@google-cloud/storage');
const bucketName = 'speech-to-text-sandbox';
const keyFileLocation = path.join(__dirname, '..', 'speech-to-text-sandbox-9b4c51ccdb39.json');
const storage = Storage({
  keyFilename: keyFileLocation
});

// create an url for uploading
app.get('/storage/link/:filename', function(req, res){

  var fileName = req.params.filename;
  var myBucket = storage.bucket(bucketName);
  var file = myBucket.file(fileName);

  file.createResumableUpload(function(err, uri) {
      if (!err) {
        res.json({uri: uri})
        // `uri` can be used to PUT data to.
        // https://cloud.google.com/storage/docs/json_api/v1/how-tos/resumable-upload
      }else{
        console.error('ERROR:', err);
        res.end(err)
      }
  });
});

// directly upload to google storage
app.post('/storage', function(req, res){


  // create an incoming form object
  var form = new formidable.IncomingForm();
  var filePath, fileName, fileType, fileLanguage;
  fileType = 'empty';
  fileLanguage = 'empty';

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = false;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '..', '/uploads');

  // parse the incoming request containing the form data
  form.parse(req);

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    filePath = path.join(form.uploadDir, file.name);
    fileName = file.name;
    fs.rename(file.path, path.join(form.uploadDir, file.name), function(err){
      if (err) throw err;
    });
    storage
      .bucket(bucketName)
      .upload(filePath)
      .then(() => {
        console.log(`${fileName} uploaded to ${bucketName}.`);
        db_Media.addMedia({
              name: fileName,
              // TODO: this needs to be a url that can be used by speech api
              uri: filePath,
              //
              type: fileType,
              language: fileLanguage
            }, function(err){
              if(err){  throw err;  }
            });
        res.end('success');
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
    });

  form.on('field', function(name, value) {
    switch (name) {
      case 'fileLanguage':
        fileLanguage = value;
        break;
      case 'fileType':
        fileType = value;
      default:
    }
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  // form.on('end', function() {
  //
  // });
})
