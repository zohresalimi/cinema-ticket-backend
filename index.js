const express = require('express');
const cors = require('cors');
const { connect } = require('./config/database');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// routes
app.use('/api/v1', routes);

// get, delete, post, put
app.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

connect();
// eslint-disable-next-line no-console
app.listen(port, () => console.log('server is running .....'));
