const Cinema = require('../models/Cinema');

module.exports = {
  async getAll(req, res) {
    try {
      const response = await Cinema.find({});
      if (!response.length) {
        return res.status(200).json({ message: 'There is no Cinema' });
      }
      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },

  async createOne(req, res) {
    try {
      if (!req.body.name) {
        return res
          .status(400)
          .json({ message: 'Name parameter was not provided!' });
      }
      const response = await Cinema.create(req.body);
      return res.status(201).json({ data: response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },

  async getOne({ params }, res) {
    try {
      const response = await Cinema.findById(params.id);
      if (!response) {
        return res.status(404).json({ message: 'Cinema not found' });
      }
      return res.status(200).json({ data: response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },

  async getByRoomIds({ query }, res) {
    const { rooms } = query;
    try {
      const response = await Cinema.find({ rooms: { $in: rooms.split(',') } })
        .populate('room')
        .exec();
      if (!response) {
        return res.status(404).json({ message: 'Room not found' });
      }
      return res.status(200).json({ data: response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },

  async updateOne({ params, body }, res) {
    const { id } = params;
    const opt = { new: true };
    let updated = false;
    try {
      const response = await Cinema.findByIdAndUpdate(id, body, opt);
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

  async deleteOne({ params }, res) {
    const { id } = params;
    let deleted = false;
    try {
      const response = await Cinema.findByIdAndRemove(id);
      if (!response) {
        return res
          .status(404)
          .json({ status: deleted, message: 'Cinema not found' });
      }
      deleted = true;
      return res.status(200).json({ status: deleted, data: response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
};
