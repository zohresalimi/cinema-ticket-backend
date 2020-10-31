const mongoose = require('mongoose');
const { TicketSchema } = require('./Tickets');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  tickets: [TicketSchema],
});

module.exports = mongoose.model('User', UserSchema);
