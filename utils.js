const jwt = require('jsonwebtoken');

const accessTokenSecret = process.env.ACCESS_TOKEN;

function generateAccessToken(username) {
  return jwt.sign(username, accessTokenSecret);
}

module.exports = { generateAccessToken };
