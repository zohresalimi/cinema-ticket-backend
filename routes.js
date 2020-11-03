const express = require('express');

const app = express.Router();
const cinema = require('./controllers/cinema');
const room = require('./controllers/room');
const movies = require('./controllers/movie');

// Cinema endpoints
app.route('/cinemas').get(cinema.getAll).post(cinema.createOne);
app
  .route('/cinemas/:id')
  .get(cinema.getOne)
  .put(cinema.updateOne)
  .delete(cinema.deleteOne);

// Room endpoints
app.route('/rooms').get(room.getAll).post(room.createOne);
app.route('/rooms/byIds').get(room.getByListId);
app
  .route('/rooms/:id')
  .get(room.getOne)
  .put(room.updateOne)
  .delete(room.deleteOne);

// Movies endpoints
app.route('/movies').get(movies.getAll).post(movies.createOne);
app
  .route('/movies/:id')
  .get(movies.getOne)
  .put(movies.updateOne)
  .delete(movies.deleteOne);
app.route('/movies/:id/room/:rid').put(movies.addRoom);

module.exports = app;
