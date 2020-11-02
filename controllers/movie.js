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

  async createOne(req, res) {
    const {
      name,
      description,
      trailerUrl,
      type,
      duration,
      age,
      coverImage,
      Director,
      Actors,
      originalTitle,
      originalLanguage,
      images,
      roomId,
      price,
    } = req.body;

    console.log(req.body);
    try {
      if (!name) {
        return res
          .status(400)
          .json({ message: 'Name parameter was not provided!' });
      }
      const response = await Movie.create({
        name,
        description,
        trailerUrl,
        type,
        duration,
        age,
        coverImage,
        Director,
        Actors,
        originalTitle,
        originalLanguage,
        images,
        roomId,
        price,
      });
      return res.status(201).json({ data: response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },

  async getOne(req, res) {
    try {
      const response = await Movie.findById(req.params.id);
      if (!response) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      return res.status(200).json({ data: response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },

  async updateOne(req, res) {
    const { id } = req.params;
    const { body } = req;
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

  async deleteOne(req, res) {
    const { id } = req.params;
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
