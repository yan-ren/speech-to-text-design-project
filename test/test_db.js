// Mongodb
var mongoose = require('mongoose');

// Connect to Mongoose
mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true });
var db = mongoose.connection;

global.db_Media = require('./../models/media');
global.db_Sub = require('./../models/sub');

// test addMedia
function test1(){
  var file_name = 'test1'
  var file_path = '/test1'
  var file_type = 'audio'
  var file_language = 'english'
  db_Media.addMedia({
        name: file_name,
        url: file_path,
        type: file_type,
        language: file_language
      }, function(err, content){
        if(err){  throw err;  }
        else{
          console.log(content);
        }
      });
}

// test addSrt
// function test2(){
//   var id = '5a01ac5bb4fb7625d3252a62';
//
//   db_Sub.addSub({
//       media_id: id,
//       content: '123'
//     }, function(err, doc){
//       if(err){
//         console.log(err);
//         throw err;  }
//
//       // update db file collection
//       // new: bool - if true, return the modified document rather than the original. defaults to false
//       db_Media.updateMedia(id, {translated: true,
//                                 srt: doc._id}, {new: false}, function(err){
//                                   if(err){  console.log(err); throw err;  }
//                                 }
//                           );
//     });
// }


test1();
//test2();
