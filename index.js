const express = require('express');
const cors = require('cors');
const { connect } = require('./config/database');

const app = express();
const port = 6000;

app.use(express.json());
app.use(cors());

const authRoute = require('./routes/authentication');

// get, delete, post, put
app.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

// routes
app.use('/', authRoute);

connect();
app.listen(port, () => console.log('server is running .....'));
