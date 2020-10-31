const mongoose = require('mongoose');

const CinemaSchema = mongoose.Schema({
  name: String,
  purchaseStartTime: Date,
  purchaseEndTime: Date,
  salons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Salon' }],
});

module.exports = mongoose.model('Cinema', CinemaSchema);
