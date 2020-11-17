const supertest = require('supertest');
const mongoose = require('mongoose');
const { expect } = require('chai');
const app = require('../app');
const { connect } = require('../config/database');
const Showing = require('../models/Showing');
const Room = require('../models/Room');

const request = supertest(app);

describe('Testing showings Route', () => {
  before(() => {
    connect();
  });

  afterEach(() => {
    mongoose.connection.db.dropCollection('showings');
  });

  after(async () => {
    mongoose.connection.close();
  });

  it('create a showing by POST method', async () => {
    const data = {
      movie: '5fa717f00e365a5bd26a6e2d',
      room: '5fa65403be2034a6cc97c3b8',
      startTime: '2020-11-13T16:00:00Z',
      price: '100',
    };
    const response = await request
      .post('/api/v1/showings')
      .send(data)
      .expect(201);
    console.log(response.body);
    expect(response.body.data._id).to.be.ok;
    expect(response.body.data.name).to.equal(data.name);
    expect(response.body.data).to.have.a.property('name');
  });
});
