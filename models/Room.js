const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
  name: { type: String, required: true },
  capacity: Number,
  cinema: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema' },
  seats: [],
});

module.exports = mongoose.model('Room', RoomSchema);
