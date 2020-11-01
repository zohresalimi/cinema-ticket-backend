const express = require('express');

const app = express.Router();
const cinema = require('./controllers/cinema');

// Cinema endpoints
app.route('/cinema').get(cinema.getAll).post(cinema.createOne);
app.route('/cinema/:id');
//   .get(cinema.getOne)
//   .put(cinema.updateOne)
//   .delete(cinema.deleteOne);

// app.post('/cinema/:id/movies', actors.addMovie);
// app.delete('/cinema/:id/movies/:mid', actors.deleteMovie);

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
