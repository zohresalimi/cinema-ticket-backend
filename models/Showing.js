const mongoose = require('mongoose');

const ShowingSchema = mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  cinema: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cinema',
    required: true,
  },
  startTime: String,
  endTime: String,
  capacity: Number,
  price: Number,
  seats: Array,
});

module.exports = mongoose.model('Showing', ShowingSchema);
