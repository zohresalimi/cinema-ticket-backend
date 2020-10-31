const mongoose = require('mongoose');
const { TicketSchema } = require('./Tickets');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  phoneNumber: String,
  tickets: [TicketSchema],
});

module.exports = mongoose.model('User', UserSchema);
