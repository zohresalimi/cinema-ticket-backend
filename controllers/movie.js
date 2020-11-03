const Movie = require('../models/Movie');

module.exports = {
  async getAll(req, res) {
    try {
      const response = await Movie.find({});
      if (!response.length) {
        return res.status(200).json({ message: 'There is no Movie' });
      }
      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },

  async createOne({ body }, res) {
    try {
      if (!body.name) {
        return res
          .status(400)
          .json({ message: 'Name parameter was not provided!' });
      }
      const response = await Movie.create(body);
      return res.status(201).json({ data: response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },

  async getOne({ params }, res) {
    try {
      const response = await Movie.findById(params.id);
      if (!response) {
        return res.status(404).json({ message: 'Movie not found' });
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
      const response = await Movie.findByIdAndUpdate(id, body, opt);
      if (!response) {
        return res
          .status(404)
          .json({ status: updated, message: 'Movie not found' });
      }
      updated = true;
      return res.status(200).json({ status: updated, data: response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },

  async addRoom({ params }, res) {
    const { id, roomid } = params;
    const opt = { new: true };
    let updated = false;
    try {
      const response = await Movie.findByIdAndUpdate(
        { _id: id },
        { $addToSet: { rooms: roomid } },
        opt
      ).exec();

      if (!response) {
        return res
          .status(404)
          .json({ status: updated, message: 'Movie not found' });
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
      const response = await Movie.findByIdAndRemove(id);
      if (!response) {
        return res
          .status(404)
          .json({ status: deleted, message: 'Movie not found' });
      }
      deleted = true;
      return res.status(200).json({ status: deleted, data: response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
};
