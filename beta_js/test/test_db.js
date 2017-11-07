// Mongodb
var mongoose = require('mongoose');

// Connect to Mongoose
mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true });
var db = mongoose.connection;

global.db_Media = require('./models/media')
global.db_Srt = require('./models/srt')

db_Srt.addSrt({
    media_id: id,
    content: JSON.stringify(res, null, 2)
  }, function(err, doc){
    if(err){  throw err;  }

    // ISSUE
    // update db file collection
    db_Media.updateMedia(id, {translated: true,
                              srt: doc._id});
  })
