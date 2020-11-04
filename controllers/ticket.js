const Ticket = require('../models/Tickets');
const Showing = require('../models/Showing');

module.exports = {
  async getAll(req, res) {
    try {
      const response = await Ticket.find({});
      if (!response.length) {
        return res.status(200).json({ message: 'There is no Ticket' });
      }
      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },

  async getByUserId(req, res) {
    if (!req.body.userId) {
      return res
        .status(400)
        .json({ message: 'Parameter `userId` was not provided!' });
    }
    try {
      const response = await Ticket.find({ userId: req.body.userId });
      if (!response.length) {
        return res.status(200).json({ message: 'There is no Ticket' });
      }
      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },

  async createOne(req, res) {
    const {
      quantity,
      seatNumbers,
      userId,
      movieName,
      roomName,
      cinemaName,
      showingId,
    } = req.body;
    try {
      const showing = await Showing.findById({ _id: showingId });
      const response = await Ticket.create({
        quantity,
        price: showing.price,
        seatNumbers,
        user: userId,
        movieName,
        cinemaName,
        roomName,
      });
      return res.status(201).json({ data: response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
};
