const supertest = require('supertest');
const mongoose = require('mongoose');
const { expect } = require('chai');
const app = require('../app');
const { connect } = require('../config/database');
const User = require('../models/User');

const request = supertest(app);

describe('Testing User Route', () => {
  before(async () => {
    await connect();
  });

  beforeEach(() => {
    mongoose.connection.db.dropCollection('users');
  });

  after(async () => {
    mongoose.connection.close();
  });

  it('create a cinema by POST method', async () => {
    const data = {
      name: 'filmstaden',
      purchaseStartTime: '8:00',
      purchaseEndTime: '21:30',
    };
    const res = await request.post('/api/v1/cinemas').send(data).expect(201);
    expect(res.body.data._id).to.be.ok;
    expect(res.body.data.name).to.equal(data.name);
    const cinema = await Cinema.findById(res.body.data._id);
    expect(cinema).to.be.ok;
    expect(cinema.name).to.equal(data.name);
  });
});
