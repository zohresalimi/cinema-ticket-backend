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

  async getByMovieId({ params }, res) {
    console.log(params);
    const { movieId } = params;
    try {
      const response = await Showing.find({
        movie: movieId,
      })
        .populate('room')
        .populate('movie')
        .exec();
      if (!response) {
        return res.status(404).json({ message: 'Room not found' });
      }
      return res.status(200).json({ data: response });
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
      const roomObject = await Room.findById({ _id: room });
      const cinemaObject = await Cinema.findOne({ rooms: { $in: room } });
      const newTimeSlot = {
        movie,
        room,
        cinema: cinemaObject._id,
        startTime,
        endTime,
        capacity: roomObject.capacity,
        seats: roomObject.seats,
      };
      const response = await Showing.create(newTimeSlot);
      return res.status(201).json({ data: response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },

  async updateOne({ params, body }, res) {
    const { id } = params;
    const opt = { new: true };
    let updated = false;
    try {
      const response = await Showing.findOne(id, body, opt);
      if (!response) {
        return res
          .status(404)
          .json({ status: updated, message: 'Cinema not found' });
      }
      updated = true;
      return res.status(200).json({ status: updated, data: response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
};
