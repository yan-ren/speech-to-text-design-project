var mongoose = require('mongoose');

//uploaded files schema
var mediaSchedma = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    requried: true
  },
  transcribe: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    // required: true
  },
  language: {
    type: String
  },
  upload_date: {
    type: Date,
    default: Date.now
  },
  // srt ObjectId
  srt: { "type": mongoose.Schema.Types.ObjectId, ref: "Srt", default: null}
});

const Media = module.exports = mongoose.model('media', mediaSchedma);

// Get Uploads
module.exports.getAllMedia = (callback, limit) => {
	Media.find(callback).limit(limit);
}

// Get upload
module.exports.getMediaById = (id, callback) => {
  Media.findById(id, callback);
}

// Add Upload
module.exports.addMedia = (upload, callback) => {
	Media.create(upload, callback);
}

// Update Upload
module.exports.updateMedia = (id, media, options, callback) => {
	var query = {_id: id};
	Media.findOneAndUpdate(query, media, options, callback);
}


// // Delete Genre
// module.exports.removeGenre = (id, callback) => {
// 	var query = {_id: id};
// 	Genre.remove(query, callback);
// }
