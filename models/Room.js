const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
  name: String,
  capacity: Number,
  cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema' },
  seats: [],
});

module.exports = {
  Room: mongoose.model('Room', RoomSchema),
  RoomSchema,
};
