const supertest = require('supertest');
const mongoose = require('mongoose');
const { expect } = require('chai');
const app = require('../app');
const { connect } = require('../config/database');
const Showing = require('../models/Showing');
const Movie = require('../models/Movie');
const Room = require('../models/Room');
const Cinema = require('../models/Cinema');

const request = supertest(app);

describe('Testing showings Route', () => {
  before(async () => {
    await connect();
  });

  beforeEach(() => {
    mongoose.connection.db.dropCollection('showings');
    mongoose.connection.db.dropCollection('movies');
    mongoose.connection.db.dropCollection('rooms');
    mongoose.connection.db.dropCollection('cinemas');
  });

  after(async () => {
    mongoose.connection.close();
  });

  it('create a showing by POST method', async () => {
    const cinema = new Cinema({
      name: 'filmstadene',
      purchaseStartTime: '8:00',
      purchaseEndTime: '21:30',
    });
    await cinema.save();

    const room = new Room({
      name: 'room 3',
      capacity: 4,
      seats: [2, 2],
      cinema: cinema._id,
    });
    await room.save();

    const movie = new Movie({
      name: 'movie 00',
      genre: ['family', 'children'],
      premiere: '2020-01-05T15:18:52.722Z',
      duration: '1:30',
    });
    await movie.save();

    cinema.rooms.push(room._id);
    await cinema.save();

    const data = {
      movie: movie._id,
      room: room._id,
      startTime: '2020-11-13T16:00:00Z',
      price: '100',
    };

    const movieID = movie._id.toString();
    const roomID = room._id.toString();
    const response = await request
      .post('/api/v1/showings')
      .send(data)
      .expect(201);
    expect(response.body.data._id).to.be.ok;
    expect(response.body.data.movie).to.be.equal(movieID);
    expect(response.body.data.room).to.be.equal(roomID);
  });

  it('should return all showings', async () => {
    const showing = new Showing({
      movie: '5fa71823adc463397a50c504',
      room: '5fa653f9e332453b9ad4d402',
      cinema: '5fa653f9e332453b9ad4d442',
      startTime: '2020-11-13T16:00:00Z',
      price: '100',
    });
    await showing.save();
    const res = await request.get('/api/v1/showings').expect(200);
    expect(res.body.response[0]).to.be.an('object');
  });

  it('should return a showings By movie Id', async () => {
    const cinema = new Cinema({
      name: 'filmstadene',
      purchaseStartTime: '8:00',
      purchaseEndTime: '21:30',
    });
    await cinema.save();

    const room = new Room({
      name: 'room 3',
      capacity: 4,
      seats: [2, 2],
      cinema: cinema._id,
    });
    await room.save();

    const movie = new Movie({
      name: 'movie 00',
      genre: ['family', 'children'],
      premiere: '2020-01-05T15:18:52.722Z',
      duration: '1:30',
    });
    await movie.save();

    const showing = new Showing({
      movie: movie._id,
      room: room._id,
      cinema: cinema._id,
      startTime: '2020-11-13T16:00:00Z',
      price: '100',
    });
    await showing.save();

    const response = await request
      .get(`/api/v1/showings/by-movie-id/${movie._id}`)
      .expect(200);
    expect(response.body).to.be.an('object');
    expect(response.body.data).to.have.lengthOf(1);

    const movieID = movie._id.toString();
    expect(response.body.data[0].movie._id).to.be.equal(movieID);
  });

  it('should update a showing By Id', async () => {
    const cinema = new Cinema({
      name: 'filmstadene',
      purchaseStartTime: '8:00',
      purchaseEndTime: '21:30',
    });
    await cinema.save();

    const room = new Room({
      name: 'room 3',
      capacity: 4,
      seats: [2, 2],
      cinema: cinema._id,
    });
    await room.save();

    const movie = new Movie({
      name: 'movie 00',
      genre: ['family', 'children'],
      premiere: '2020-01-05T15:18:52.722Z',
      duration: '1:30',
    });
    await movie.save();

    const showing = new Showing({
      movie: movie._id,
      room: room._id,
      cinema: cinema._id,
      startTime: '2020-11-13T16:00:00Z',
      price: '100',
    });
    await showing.save();

    const data = {
      startTime: '2020-11-13T10:30:00Z',
      price: 99,
    };

    const response = await request
      .put(`/api/v1/showings/${showing._id}`)
      .send(data)
      .expect(200);
    const date = new Date(data.startTime).getTime();
    expect(response.body).to.include({ status: true });
    const foundUpdatedShowing = await Showing.findOne({ _id: showing._id });
    expect(foundUpdatedShowing.startTime.getTime()).to.equal(date);
    expect(foundUpdatedShowing.price).to.equal(data.price);
  });
});
