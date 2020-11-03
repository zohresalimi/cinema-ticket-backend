const mongoose = require('mongoose');

const ShowingSchema = mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall' },
  cinema: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema' },
  startTime: Date,
  endTime: Date,
  capacity: Number,
  seats: { default: [] },
});

module.exports = mongoose.model('Showing', ShowingSchema);
