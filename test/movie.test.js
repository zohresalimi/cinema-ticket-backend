const supertest = require('supertest');
const mongoose = require('mongoose');
const { expect } = require('chai');
const app = require('../app');
const { connect } = require('../config/database');
const Movie = require('../models/Movie');

const request = supertest(app);

describe('Testing Room Route', () => {
  before(() => {
    connect();
  });

  after(async () => {
    mongoose.connection.db.dropCollection('movies');
    mongoose.connection.close();
  });

  it('create a room by POST method', async () => {
    const cinema = new Cinema({
      name: 'filmstaden old',
      purchaseStartTime: '8:00',
      purchaseEndTime: '21:30',
    });
    await cinema.save();

    const data = {
      name: 'filmstaden',
      capacity: 4,
      cinema: cinema._id,
      seats: [2, 2],
    };
    const response = await request.post('/api/v1/rooms').send(data).expect(201);
    expect(response.body.data._id).to.be.ok;
    expect(response.body.data.name).to.equal(data.name);
    expect(response.body.data).to.have.a.property('name');

    const room = await Room.findById(response.body.data._id);
    const updatedCinema = await Cinema.findById(cinema._id);

    expect(room).to.be.ok;
    expect(updatedCinema.rooms).to.include(response.body.data._id);
    expect(room.name).to.equal(data.name);
  });

  //   it('should return all rooms', async () => {
  //     const room = new Room({
  //       name: 'filmstaden',
  //       capacity: 4,
  //       cinema: '5fa653c0643c06586bba7d78',
  //       seats: [2, 2],
  //     });
  //     await room.save();
  //     const res = await request.get('/api/v1/rooms').expect(200);
  //     expect(res.body.response[0]).to.be.an('object');
  //     expect(res.body.response[0].name).to.equal(room.name);
  //   });

  //   it('should return one room by Id', async () => {
  //     const room = new Room({
  //       name: 'room 3',
  //       capacity: 4,
  //       cinema: '5fa653c0643c06586bba7d45',
  //       seats: [2, 2],
  //     });
  //     await room.save();
  //     const id = room._id.toString();
  //     const response = await request.get(`/api/v1/rooms/${id}`).expect(200);
  //     const { data } = response.body;
  //     expect(data._id).to.equal(id);
  //   });

  //   it('should update a room', async () => {
  //     const room = new Room({
  //       name: 'room 4',
  //       capacity: 4,
  //       cinema: '5fa653c0643c06586bba7d45',
  //       seats: [2, 2],
  //     });
  //     await room.save();

  //     const updatedInfo = {
  //       name: 'room 3',
  //       capacity: 4,
  //       cinema: '5fa653c0643c06586bba7d45',
  //       seats: [2, 2],
  //     };

  //     await request.put(`/api/v1/rooms/${room._id}`).send(updatedInfo);

  //     const foundUpdatedRoom = await Room.findOne({ _id: room._id });

  //     expect(foundUpdatedRoom.name).to.equal(updatedInfo.name);
  //   });

  //   it('should delete a room', async () => {
  //     const cinema = new Cinema({
  //       name: 'filmstaden old',
  //       purchaseStartTime: '8:00',
  //       purchaseEndTime: '21:30',
  //     });
  //     await cinema.save();

  //     const room = new Room({
  //       name: 'room 3',
  //       capacity: 4,
  //       cinema: cinema._id,
  //       seats: [2, 2],
  //     });
  //     await room.save();

  //     const response = await request
  //       .delete(`/api/v1/rooms/${room._id}`)
  //       .expect(200);
  //     expect(response.body).to.include({ status: true });

  //     const deletedRoom = await Cinema.findOne({ _id: room._id });
  //     expect(deletedRoom).to.be.null;

  //     const removedFromCinema = await Cinema.findById(cinema._id);
  //     expect(removedFromCinema.rooms)
  //       .to.be.an('array')
  //       .that.does.not.include(room._id);
  //   });
});
