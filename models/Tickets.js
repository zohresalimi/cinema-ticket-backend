const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
  date: Number,
  status: Boolean,
  quantity: Number,
  price: Number,
  seatNumber: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  cinema: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema' },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
});

module.exports = mongoose.model('Ticket', TicketSchema);
