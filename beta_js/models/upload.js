var mongoose = require('mongoose');

//uploaded files schema
var uploadsSchedma = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    requried: true
  },
  translated: {
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
  srt: { "type": mongoose.Schema.Types.ObjectId, "ref": "Srt" }
});

const Upload = module.exports = mongoose.model('uploads', uploadsSchedma);

// Get Uploads
module.exports.getUploads = (callback, limit) => {
	Upload.find(callback).limit(limit);
}

// Get upload
module.exports.getUploadById = (id, callback) => {
  Upload.findById(id, callback);
}

// Add Upload
module.exports.addUpload = (upload, callback) => {
	Upload.create(upload, callback);
}

// // Update Genre
// module.exports.updateGenre = (id, genre, options, callback) => {
// 	var query = {_id: id};
// 	var update = {
// 		name: genre.name
// 	}
// 	Genre.findOneAndUpdate(query, update, options, callback);
// }


// // Delete Genre
// module.exports.removeGenre = (id, callback) => {
// 	var query = {_id: id};
// 	Genre.remove(query, callback);
// }
