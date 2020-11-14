const express = require('express');

const app = express.Router();
const cinemas = require('./controllers/cinema');
const rooms = require('./controllers/room');
const movies = require('./controllers/movie');
const showings = require('./controllers/showing');
const users = require('./controllers/user');
const tickets = require('./controllers/ticket');
const checkout = require('./controllers/checkout');

// Cinema endpoints
app.route('/cinemas').get(cinemas.getAll).post(cinemas.createOne);
app.route('/cinemas/by-room-ids').get(cinemas.getByRoomIds);
app
  .route('/cinemas/:id')
  .get(cinemas.getOne)
  .put(cinemas.updateOne)
  .delete(cinemas.deleteOne);

// Room endpoints
app.route('/rooms').get(rooms.getAll).post(rooms.createOne);
app.route('/rooms/byIds').get(rooms.getByListId);
app
  .route('/rooms/:id')
  .get(rooms.getOne)
  .put(rooms.updateOne)
  .delete(rooms.deleteOne);

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
app.route('/users').get(users.getAll).post(users.createOne);

// Ticket endpoints
app.route('/ticket').get(tickets.getAll).post(tickets.createOne);

app.route('/create-checkout-session').post(checkout.createOne);
module.exports = app;
