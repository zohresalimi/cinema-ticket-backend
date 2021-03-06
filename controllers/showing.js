const Cinema = require('../models/Cinema');
const Room = require('../models/Room');
const Showing = require('../models/Showing');
const Movie = require('../models/Movie');

const generateEndTime = (start, duration) => {
  const startTime = new Date(start).getTime();
  const [h, m] = duration.split(':');
  const durationMillis = (+h * 60 + +m) * 60 * 1000;
  const endTime = new Date(startTime + durationMillis).toISOString();
  return endTime;
};

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
    const { movieId } = params;
    try {
      const response = await Showing.find({
        movie: movieId,
      })
        .populate('movie')
        .populate('room')
        .exec();
      if (!response) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      return res.status(200).json({ data: response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },

  async createOne(req, res) {
    const { movie, room, startTime, price } = req.body;
    try {
      if (!movie || !room) {
        return res
          .status(400)
          .json({ message: 'Movie and Room parameter were not provided!' });
      }
      const movieObj = await Movie.findById({ _id: movie });
      const endTimeMovie = generateEndTime(startTime, movieObj.duration);
      const roomObject = await Room.findById({ _id: room });
      const cinemaObject = await Cinema.findOne({ rooms: { $in: room } });
      const newTimeSlot = {
        movie,
        room,
        cinema: cinemaObject._id,
        startTime,
        endTime: endTimeMovie,
        capacity: roomObject.capacity,
        price,
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
      const response = await Showing.findByIdAndUpdate(id, body, opt);
      if (!response) {
        return res
          .status(404)
          .json({ status: updated, message: 'showing not found' });
      }
      updated = true;
      return res.status(200).json({ status: updated, data: response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
};
