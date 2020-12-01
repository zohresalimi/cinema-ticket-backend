const express = require('express');
const cors = require('cors');
const routes = require('./routes');

module.exports = function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // routes
  app.use('/api/v1', routes);

  // get, delete, post, put
  app.get('/', (req, res) => {
    res.json({ message: 'Hello' });
  });

  return app;
};
