var mongoose = require('mongoose');

//uploaded files schema
var subSchedma = mongoose.Schema({
  media_id:{
    type: mongoose.Schema.Types.ObjectId, ref: "media"
  },
  content:{
    type:String
  },
  upload_date: {
    type: Date,
    default: Date.now
  }
});

const Sub = module.exports = mongoose.model('sub', subSchedma);

// Get all Subs
module.exports.getSub = (callback, limit) => {
	Sub.find(callback).limit(limit);
}
// Get Sub
module.exports.getSubById = (id, callback) => {
  Sub.findById(id, callback);
}

// Add Sub
module.exports.addSub = (upload, callback) => {
	Sub.create(upload, callback);
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
