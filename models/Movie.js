const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
  name: String,
  description: String,
  trailerUrl: String,
  type: String,
  duration: String,
  age: String,
  history: String,
  Director: String,
  Actors: [],
  originalTitle: String,
  originalLanguage: String,
  images: [],
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  price: Number,
});

module.exports = {
  Movie: mongoose.model('Movie', MovieSchema),
  MovieSchema,
};
