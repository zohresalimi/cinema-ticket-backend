const supertest = require('supertest');
const mongoose = require('mongoose');
const { expect } = require('chai');
const app = require('../app');
const { connect } = require('../config/database');
const Cinema = require('../models/Cinema');

const request = supertest(app);

describe('Testing Cinema Route', () => {
  before(async () => {
    await connect();
  });

  beforeEach(() => {
    mongoose.connection.db.dropCollection('cinemas');
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

  it('should return all cinemas', async () => {
    const newCinema = new Cinema({
      name: 'filmstaden',
      purchaseStartTime: '8:00',
      purchaseEndTime: '21:30',
    });
    await newCinema.save();
    const res = await request.get('/api/v1/cinemas').expect(200);
    expect(res.body.response[0]).to.be.an('object');
    expect(res.body.response[0].name).to.equal(newCinema.name);
  });

  it('should return one cinema by Id', async () => {
    const expectedCinema = new Cinema({
      name: 'filmstadene',
      purchaseStartTime: '8:00',
      purchaseEndTime: '21:30',
    });
    await expectedCinema.save();
    const id = expectedCinema._id.toString();
    const response = await request.get(`/api/v1/cinemas/${id}`).expect(200);
    const { data } = response.body;
    expect(data._id).to.equal(id);
  });

  it('should return one cinema by Room Ids', async () => {
    const expectedCinema = new Cinema({
      name: 'filmstadene',
      purchaseStartTime: '8:00',
      purchaseEndTime: '21:30',
      rooms: ['5fa653c0643c06586bba7d78'],
    });
    await expectedCinema.save();

    const response = await request
      .get(`/api/v1/cinemas/by-room-ids`)
      .query({
        rooms: expectedCinema.rooms.join(','),
      })
      .expect(200);
    expect(response.body).to.be.an('object');
    expect(response.body.data[0]).to.deep.nested.include({
      rooms: ['5fa653c0643c06586bba7d78'],
    });
  });

  it('should update a cinema', async () => {
    const cinema = new Cinema({
      name: 'filmstadene',
      purchaseStartTime: '8:00',
      purchaseEndTime: '21:30',
    });
    await cinema.save();

    const updatedInfo = {
      name: 'filmstadene Kista',
      purchaseStartTime: '8:00',
      purchaseEndTime: '21:30',
    };

    const response = await request
      .put(`/api/v1/cinemas/${cinema._id}`)
      .send(updatedInfo)
      .expect(200);
    expect(response.body).to.include({ status: true });
    const foundUpdatedCinema = await Cinema.findOne({ _id: cinema._id });
    expect(foundUpdatedCinema.name).to.equal(updatedInfo.name);
  });

  it('should delete a cinema', async () => {
    const cinema = new Cinema({
      name: 'filmstadene Kista',
      purchaseStartTime: '8:00',
      purchaseEndTime: '21:30',
    });
    await cinema.save();

    const response = await request
      .delete(`/api/v1/cinemas/${cinema._id}`)
      .expect(200);
    expect(response.body).to.include({ status: true });
    const deletedCinema = await Cinema.findOne({ _id: cinema._id });
    expect(deletedCinema).to.be.null;
  });
});
