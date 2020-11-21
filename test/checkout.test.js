const supertest = require('supertest');
const mongoose = require('mongoose');
const { expect } = require('chai');
const app = require('../app');
const nock = require('nock');
const { connect } = require('../config/database');

const Ticket = require('../models/Ticket');
const User = require('../models/User');
const Showing = require('../models/Showing');

const reserveTestTicket = async () => {
  const user = new User({
    name: 'Test name',
    email: 'test@domain.com',
  });

  const showing = new Showing({
    movie: '5fa71823adc463397a50c504',
    room: '5fa653f9e332453b9ad4d402',
    cinema: '5fa653f9e332453b9ad4d442',
    startTime: '2020-11-13T16:00:00Z',
    price: '100',
    capacity: 10,
    seats: [
      [
        { seatNumber: 1, taken: 'available' },
        { seatNumber: 2, taken: 'available' },
      ],
      [
        { seatNumber: 1, taken: 'available' },
        { seatNumber: 2, taken: 'available' },
      ],
    ],
  });
  await showing.save();

  const ticket = new Ticket({
    quantity: 2,
    seatNumbers: [[0, [0, 1]]],
    price: 200,
    unitAmount: 100,
    user: user._id,
    movieName: 'movie 1',
    roomName: 'room 2',
    cinemaName: 'cinema 1',
    showing: showing._id,
    movieCover:
      'https://catalog.cinema-api.com/cf/images/ncg-images/ead503a39bb9493aa8c772d821a50bb3.jpg?width=240&version=00D33922702B66203E0E9C8F6B7428B3&format=webp',
  });

  await ticket.save();
  user.tickets.push(ticket._id);
  await user.save();

  return {
    ticketId: ticket._id.toString(),
    showingId: showing._id.toString(),
  };
};

describe('Testing Checkout Route', () => {
  let request;

  before(async () => {
    request = supertest(app);
    await connect();
  });

  beforeEach(() => {
    mongoose.connection.db.dropCollection('tickets');
    mongoose.connection.db.dropCollection('showings');
    mongoose.connection.db.dropCollection('users');
  });

  after(async () => {
    mongoose.connection.close();
  });

  it('returns an error received from the Stripe API', async () => {
    const testSessionId = 'sessionId';
    nock('https://api.stripe.com:443')
      .post('/v1/checkout/sessions')
      .reply(200, {
        id: testSessionId,
      });

    const { ticketId, showingId } = await reserveTestTicket();

    const res = await request
      .post('/api/v1/checkout/create')
      .send({ ticketId })
      .expect(200);

    const updatedShowing = await Showing.findById(showingId);

    expect(res.body.id).to.be.eq(testSessionId);
    expect(updatedShowing.seats[0][0].taken).to.be.eq('reserved');
  });

  it('should handle cancel payment', async () => {
    const { ticketId, showingId } = await reserveTestTicket();
    const updatedTicket = await Ticket.findById(ticketId);

    await request
      .post(`/api/v1/checkout/cancel/${updatedTicket.sessionId}`)
      .expect(200);
    const updatedShowing = await Showing.findById(showingId);

    expect(updatedShowing.seats[0][0].taken).to.be.eq('available');
  });
});
