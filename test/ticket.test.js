const supertest = require('supertest');
const mongoose = require('mongoose');
const { expect } = require('chai');
const app = require('../app');
const { connect } = require('../config/database');
const Ticket = require('../models/Ticket');
const User = require('../models/User');

const request = supertest(app);

describe('Testing Ticket Route', () => {
  before(async () => {
    await connect();
  });

  beforeEach(() => {
    mongoose.connection.db.dropCollection('tickets');
    mongoose.connection.db.dropCollection('users');
  });

  after(async () => {
    mongoose.connection.close();
  });

  it('create a ticket by POST method', async () => {
    const data = {
      quantity: 2,
      seatNumbers: [1, [1, 2]],
      price: 200,
      unitAmount: 100,
      email: 'a@test.com',
      movieName: 'movie 1',
      roomName: 'room 2',
      cinemaName: 'cinema 1',
      showing: '5fa71823adc463397a50c504',
      movieCover:
        'https://catalog.cinema-api.com/cf/images/ncg-images/ead503a39bb9493aa8c772d821a50bb3.jpg?width=240&version=00D33922702B66203E0E9C8F6B7428B3&format=webp',
    };
    const response = await request
      .post('/api/v1/tickets')
      .send(data)
      .expect(201);

    expect(response.body.data._id).to.be.ok;
    expect(response.body.data.status).to.be.false;
    const user = await User.findOne({ email: data.email });
    expect(user).to.be.ok;
  });

  it('should return all tickets', async () => {
    await Ticket.create({
      quantity: 2,
      seatNumbers: [1, [1, 2]],
      price: 200,
      unitAmount: 100,
      email: 'a@test.com',
      movieName: 'movie 1',
      roomName: 'room 2',
      cinemaName: 'cinema 1',
      showing: '5fa71823adc463397a50c504',
      movieCover:
        'https://catalog.cinema-api.com/cf/images/ncg-images/ead503a39bb9493aa8c772d821a50bb3.jpg?width=240&version=00D33922702B66203E0E9C8F6B7428B3&format=webp',
    });

    const response = await request.get('/api/v1/tickets').expect(200);
    expect(response.body.response).to.be.an('array');
  });
});
