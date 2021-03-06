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
  async searchOne(req, res) {
    try {
      const response = await Movie.aggregate([
        {
          $search: {
            autocomplete: {
              query: `${req.query.query}`,
              path: 'name',
              fuzzy: {
                maxEdits: 2,
                prefixLength: 1,
              },
            },
          },
        },
      ]).project('name id genre coverImage premiere');
      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },

  async createOne({ body }, res) {
    try {
      if (!body.name || !body.duration) {
        return res
          .status(400)
          .json({ message: 'Name and duration parameter were not provided!' });
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

  async getByGenre({ query }, res) {
    const { genre } = query;

    try {
      const response = await Movie.find({
        genre: { $in: genre },
      }).exec();
      if (!response) {
        return res
          .status(404)
          .json({ status: false, message: 'Movie not found' });
      }

      return res.status(200).json({ status: true, data: response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },

  async getByUpcoming(req, res) {
    try {
      const currentDate = new Date().toJSON();
      const response = await Movie.find({
        premiere: { $gt: currentDate },
      }).exec();
      if (!response.length) {
        return res.status(200).json({ message: 'there is no upcoming movie' });
      }
      return res.status(200).json({ data: response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },

  async getCurrentPremiere(req, res) {
    let updated = false;
    try {
      const currentDate = new Date().toJSON();
      const response = await Movie.find({
        premiere: { $lte: currentDate },
      }).exec();
      if (!response) {
        return res.status(404).json({
          status: updated,
          message: 'Movie not found',
        });
      }
      updated = true;
      return res.status(200).json({ status: updated, data: response });
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
    const { id, rid } = params;
    const opt = { new: true };
    let updated = false;
    try {
      const response = await Movie.findByIdAndUpdate(
        { _id: id },
        { $addToSet: { rooms: rid } },
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
