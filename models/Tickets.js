const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema(
  {
    status: { type: Boolean, default: false },
    quantity: Number,
    price: Number,
    seatNumbers: [],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    showing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Showing',
      required: true,
    },
    cinemaName: String,
    roomName: String,
    movieName: String,
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

module.exports = mongoose.model('Ticket', TicketSchema);
