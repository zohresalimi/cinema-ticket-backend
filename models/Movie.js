const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
  name: String,
  description: String,
  trailerUrl: String,
  genre: [],
  duration: String,
  age: String,
  coverImage: String,
  largeImage: String,
  director: String,
  premiere: String,
  actors: { default: [] },
  originalTitle: String,
  originalLanguage: String,
  images: { default: [] },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
});

module.exports = mongoose.model('Movie', MovieSchema);
