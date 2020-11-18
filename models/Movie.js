const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  trailerUrl: String,
  genre: [],
  duration: { type: String, required: true },
  age: String,
  coverImage: String,
  largeImage: String,
  director: String,
  premiere: String,
  actors: { default: [] },
  originalTitle: String,
  images: { default: [] },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
});

module.exports = mongoose.model('Movie', MovieSchema);
