const Cinema = require('../models/Cinema');

module.exports = {
  async getAll(req, res) {
    try {
      const response = await Cinema.find({});
      if (!response.length) {
        return res.status(200).json({ message: 'No Cinema found' });
      }
      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },

  async createOne(req, res) {
    const { name, purchaseStartTime, purchaseEndTime, rooms } = req.body;
    try {
      if (!name) {
        return res
          .status(400)
          .json({ message: 'Name parameter was not provided!' });
      }
      const response = await Cinema.create({
        name,
        purchaseStartTime,
        purchaseEndTime,
        rooms,
      });
      return res.status(201).json({ data: response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
};
