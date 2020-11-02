const express = require('express');

const app = express.Router();
const cinema = require('./controllers/cinema');
const room = require('./controllers/room');

// Cinema endpoints
app.route('/cinema').get(cinema.getAll).post(cinema.createOne);
app
  .route('/cinema/:id')
  .get(cinema.getOne)
  .put(cinema.updateOne)
  .delete(cinema.deleteOne);

// Room endpoints
app.route('/room').get(room.getAll).post(room.createOne);
app
  .route('/room/:id')
  .get(room.getOne)
  .put(room.updateOne)
  .delete(room.deleteOne);

// movies endpoints
// app.route('/movies').get(movies.getAll).post(movies.createOne);
// app
//   .route('/movies/:id')
//   .get(movies.getOne)
//   .put(movies.updateOne)
//   .delete(movies.deleteOne);
// app.post('/movies/:id/room', movies.addRoom);
// app.delete('/movies/:id/room/:rid', movies.deleteRoom);

module.exports = app;