const mongoose = require('mongoose');

const ShowingSchema = mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
    unique: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
    unique: true,
  },
  cinema: String,
  startTime: String,
  endTime: String,
  capacity: Number,
  seats: Array,
});

module.exports = mongoose.model('Showing', ShowingSchema);
