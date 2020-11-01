const mongoose = require('mongoose');

const CinemaSchema = mongoose.Schema({
  name: { type: String, required: true },
  purchaseStartTime: String,
  purchaseEndTime: String,
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
});

module.exports = mongoose.model('Cinema', CinemaSchema);
