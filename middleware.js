const jwt = require('jsonwebtoken');

const accessToken = process.env.ACCESS_TOKEN;

const handleUnAuthorized = (res, message) => {
  res.status(401).json({ status: false, message });
};

const userAuthenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      handleUnAuthorized(res, 'Auth token is not supplied');
      return;
    }
    const token = authHeader.split(' ')[1];
    const deCode = await jwt.verify(token, accessToken);
    if (!deCode) {
      handleUnAuthorized(res, 'Token is not valid');
      return;
    }
    req.user = deCode;
    next();
  } catch (error) {
    res.status(500).json({
      confirmation: 'fail',
      message: 'problem authenticating user',
    });
    throw new Error(error);
  }
};
module.exports = { userAuthenticate };
