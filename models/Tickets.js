const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema(
  {
    status: { type: Boolean, default: false },
    quantity: Number,
    price: Number,
    unitAmount: Number,
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
    movieCover: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ticket', TicketSchema);
