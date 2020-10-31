const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
  date: Number,
  status: Boolean,
  quantity: Number,
  price: Number,
  seatNumber: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema' },
  salonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Salon' },
});

module.exports = {
  Ticket: mongoose.model('Ticket', TicketSchema),
  TicketSchema,
};
