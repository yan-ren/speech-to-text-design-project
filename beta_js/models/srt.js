var mongoose = require('mongoose');

//uploaded files schema
var srtSchedma = mongoose.Schema({
  // file link: link to a uploaded file
  file_link:{
    "type": mongoose.Schema.Types.ObjectId, "ref": "uploads"
  },
  content:{
    type:String
  },
  upload_date: {
    type: Date,
    default: Date.now
  }
});

const Srt = module.exports = mongoose.model('srt', srtSchedma);

// Get Srts
module.exports.getSrt = (callback, limit) => {
	Srt.find(callback).limit(limit);
}
// Get Srt
module.exports.getSrtById = (id, callback) => {
  Srt.findById(id, callback);
}

// Add Srt
module.exports.addSrt = (upload, callback) => {
	Srt.create(upload, callback);
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
