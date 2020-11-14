const User = require('../models/User');

module.exports = {
  async getAll(req, res) {
    try {
      const response = await User.find({});
      if (!response.length) {
        return res.status(200).json({ message: 'There is no Users' });
      }
      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },

  async createOne(req, res) {
    const { email } = req.body;
    try {
      const user = await User.create({ email });
      return res.status(201).json({ user, message: 'user is created' });
    } catch (error) {
      throw new Error(error);
    }
  },
};
