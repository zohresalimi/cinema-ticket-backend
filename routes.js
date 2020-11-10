const express = require('express');

const app = express.Router();
const cinema = require('./controllers/cinema');
const room = require('./controllers/room');
const movies = require('./controllers/movie');
const showings = require('./controllers/showing');
const checkout = require('./controllers/checkout');

// Cinema endpoints
app.route('/cinemas').get(cinema.getAll).post(cinema.createOne);
app.route('/cinemas/by-room-ids').get(cinema.getByRoomIds);
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
app.route('/movies/by-genre').get(movies.getByGenre);
app.route('/movies/current-movie').get(movies.getCurrentPremiere);
app.route('/movies/upcoming').get(movies.getByUpcoming);
app
  .route('/movies/:id')
  .get(movies.getOne)
  .put(movies.updateOne)
  .delete(movies.deleteOne);
app
  .route('/movies/:id/room/:rid')
  .put(movies.addRoom)
  .delete(movies.deleteRoom);

// Showing endpoints
app.route('/showings').get(showings.getAll).post(showings.createOne);
app.route('/showings/by-movie-id/:movieId').get(showings.getByMovieId);
app.route('/showings/:id').put(movies.updateOne);

// Ticket endpoints
// app.route('/ticket').get(showings.getAll).post(showings.createOne);

app.route('/create-checkout-session').post(checkout.createOne);
module.exports = app;
