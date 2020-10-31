const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
  name: String,
  description: String,
  videoUrl: String,
  type: String,
  duration: String,
  age: String,
  history: String,
  Director: String,
  Actor: String,
  originalTitle: String,
  originalLanguage: String,
  images: [],
  salond: { type: mongoose.Schema.Types.ObjectId, ref: 'Salon' },
  price: Number,
});

module.exports = {
  Movie: mongoose.model('Movie', MovieSchema),
  MovieSchema,
};
