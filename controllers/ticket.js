const Ticket = require('../models/Tickets');
const User = require('../models/User');

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
    console.log(req.body);
    const {
      quantity,
      seatNumbers,
      price,
      unitAmount,
      email,
      movieName,
      roomName,
      cinemaName,
      showing,
      movieCover,
    } = req.body;

    try {
      const ticket = new Ticket({
        quantity,
        price,
        unitAmount,
        seatNumbers,
        showing,
        movieName,
        cinemaName,
        roomName,
        movieCover,
      });
      const userObj = await User.findOneAndUpdate(
        { email },
        { $addToSet: { tickets: ticket._id } },
        { upsert: true, new: true }
      );

      ticket.userId = userObj._id;

      ticket.save();
      return res
        .status(201)
        .json({ data: ticket, message: 'Ticket is created' });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
};
