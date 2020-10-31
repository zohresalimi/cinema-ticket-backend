const mongoose = require('mongoose');

const SalonSchema = mongoose.Schema({
  name: String,
  capacity: Number,
  cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema' },
  seats: [],
});

module.exports = {
  Salon: mongoose.model('Salon', SalonSchema),
  SalonSchema,
};
