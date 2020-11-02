const express = require('express');

const router = express.Router();

// Models
const User = require('../models/user');

// signup method
router.post('/signup', async (req, res) => {
  const { name, email, phoneNumber } = req.body;
  try {
    await User.create({ name, email, phoneNumber });
    return res.status(201).json({ user, message: 'user is created' });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;