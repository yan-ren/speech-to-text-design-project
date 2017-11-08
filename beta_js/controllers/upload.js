/* global app, db_Upload, db_Srt, path */

var formidable = require('formidable');
var fs = require('fs');

// this url is for handling upload form
app.post('/upload', function(req, res){

  // create an incoming form object
  var form = new formidable.IncomingForm();
  var file_path, file_name, file_tpye, file_language;
  file_type = 'empty';
  file_language = 'empty';

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = false;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '..', '/uploads');

  // parse the incoming request containing the form data
  form.parse(req);

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    file_path = path.join(form.uploadDir, file.name);
    file_name = file.name;
    fs.rename(file.path, path.join(form.uploadDir, file.name), function(err){
      if (err) throw err;
    });
  });

  form.on('field', function(name, value) {
    switch (name) {
      case 'FileLanguage':
        file_language = value;
        break;
      case 'FileType':
        file_type = value;
      default:
    }
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    db_Media.addMedia({
          name: file_name,
          url: file_path,
          type: file_type,
          language: file_language
        }, function(err){
          if(err){  throw err;  }
        });
    res.end('success');
  });
});
