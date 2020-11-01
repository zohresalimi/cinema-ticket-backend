const mongoose = require('mongoose');

const ShowingSchema = mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  hallsId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall' },
  cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema' },
  startTime: Date,
  endTime: Date,
  capacity: Number,
});
