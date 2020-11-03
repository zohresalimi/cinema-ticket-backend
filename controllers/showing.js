const Cinema = require('../models/Cinema');
const Room = require('../models/Room');
const Showing = require('../models/Showing');

module.exports = {
  async getAll(req, res) {
    try {
      const response = await Showing.find({});
      if (!response.length) {
        return res.status(200).json({ message: 'There is no Show Time' });
      }
      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },

  async createOne(req, res) {
    const { movie, room, startTime, endTime } = req.body;
    try {
      if (!movie || !room) {
        return res
          .status(400)
          .json({ message: 'Movie and Room parameter were not provided!' });
      }
      const roomCapacity = await Room.findById({ _id: room });
      const cinema = await Cinema.findOne({ rooms: { $in: room } });
      const newTimeSlot = {
        movie,
        room,
        cinema: cinema.name,
        startTime,
        endTime,
        capacity: roomCapacity.capacity,
        seats: roomCapacity.seats,
      };
      const response = await Showing.create(newTimeSlot);
      return res.status(201).json({ data: response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
};
