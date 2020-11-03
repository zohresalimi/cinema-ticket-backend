const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
  name: String,
  description: String,
  trailerUrl: String,
  type: String,
  duration: String,
  age: String,
  coverImage: String,
  Director: String,
  actors: { default: [] },
  originalTitle: String,
  originalLanguage: String,
  images: { default: [] },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
  price: Number,
  premiere: Date,
});

module.exports = mongoose.model('Movie', MovieSchema);
