const supertest = require('supertest');
const mongoose = require('mongoose');
const { expect } = require('chai');
const app = require('../app');
const { connect } = require('../config/database');
const Movie = require('../models/Movie');
const Room = require('../models/Room');

const request = supertest(app);

describe('Testing movie Route', () => {
  before(async () => {
    await connect();
  });

  beforeEach(() => {
    mongoose.connection.db.dropCollection('movies');
    mongoose.connection.db.dropCollection('rooms');
  });

  after(async () => {
    mongoose.connection.close();
  });

  it('create a movie by POST method', async () => {
    const data = {
      name: 'follow me',
      description:
        'A popular influencer and his friends travel the world and film themselves in extreme situations. In Russia, they are invited to a mysterious escape room by an eccentric millionaire and see a given video success on social media in front of them. But no likes in the world can buy them free from the nightmare that awaits',
      trailerUrl: 'https://youtu.be/tiBE56vQ0Fg',
      genre: ['horror', 'thriller'],
      duration: '1:28',
      age: '15',
      coverImage:
        'https://catalog.cinema-api.com/cf/images/ncg-images/ead503a39bb9493aa8c772d821a50bb3.jpg?width=240&version=00D33922702B66203E0E9C8F6B7428B3&format=webp',
      largeImage:
        'https://catalog.cinema-api.com/cf/images/ncg-images/f06ecf0f968c48bc9ea0e96915caef98.jpg?width=1920&version=51F9983982797F8FBF65250BC4E9A775&format=webp',
      director: 'will wernick',
      premiere: '2020-10-05T15:18:52.722Z',
      actors: ['Holland Roden', 'Ronen Rubinstein', 'Keegan Allen'],
      originalTitle: 'English',
      rooms: ['5fa700379bae0e19e2463e8d', '5fa7002a7d8e0ebd4e8d866b'],
    };
    const response = await request
      .post('/api/v1/movies')
      .send(data)
      .expect(201);
    expect(response.body.data._id).to.be.ok;
    expect(response.body.data.name).to.equal(data.name);
    expect(response.body.data).to.have.a.property('name');
    expect(response.body.data).to.have.a.property('duration');
  });

  it('should return all Movies', async () => {
    const movie = new Movie({
      name: 'movie 1',
      genre: ['horror', 'thriller'],
      duration: '1:28',
      age: '15',
      director: 'will wernick',
      premiere: '2020-10-05T15:18:52.722Z',
      rooms: ['5fa700379bae0e19e2463e8d', '5fa7002a7d8e0ebd4e8d866b'],
    });
    await movie.save();
    const res = await request.get('/api/v1/movies').expect(200);
    expect(res.body.response[0]).to.be.an('object');
    expect(res.body.response[0].name).to.equal(movie.name);
  });

  it('should return one movie by Id', async () => {
    const movie = new Movie({
      name: 'movie 2',
      genre: ['horror', 'thriller'],
      duration: '1:28',
      age: '15',
      director: 'will wernick',
      premiere: '2020-10-05T15:18:52.722Z',
      rooms: ['5fa700379bae0e19e2463e8d', '5fa7002a7d8e0ebd4e8d866b'],
    });
    await movie.save();
    const id = movie._id.toString();
    const response = await request.get(`/api/v1/movies/${id}`).expect(200);
    const { data } = response.body;
    expect(data._id).to.equal(id);
  });

  it('should return movies by genre', async () => {
    const movie = new Movie({
      name: 'movie 3',
      genre: ['family', 'children'],
      duration: '1:28',
    });

    await movie.save();
    const genre = ['family', 'children'];
    const response = await request
      .get('/api/v1/movies/by-genre')
      .query({
        genre: genre,
      })
      .expect(200);
    expect(response.body.data[0].genre).to.include.members(genre);
  });

  it('should return empty if there is no upcoming movie', async () => {
    const currentMovie = new Movie({
      name: 'movie 4',
      genre: ['family', 'children'],
      premiere: '2020-01-05T15:18:52.722Z',
      duration: '1:28',
    });
    await currentMovie.save();

    const response = await request.get('/api/v1/movies/upcoming').expect(200);
    expect(response.body).to.have.not.property('data');
  });

  it('should return upcoming movies', async () => {
    const upcomingMovie = new Movie({
      name: 'movie 5',
      genre: ['family', 'children'],
      premiere: '2021-01-05T15:18:52.722Z',
      duration: '1:28',
    });
    await upcomingMovie.save();

    const upcomingResponse = await request
      .get('/api/v1/movies/upcoming')
      .expect(200);
    expect(upcomingResponse.body).to.have.property('data');
    expect(upcomingResponse.body.data).to.have.lengthOf(1);
  });

  it('should return current movies', async () => {
    const currentMovie = new Movie({
      name: 'movie 5',
      genre: ['family', 'children'],
      premiere: '2020-01-05T15:18:52.722Z',
      duration: '1:28',
    });
    await currentMovie.save();

    const response = await request
      .get('/api/v1/movies/current-movie')
      .expect(200);
    expect(response.body).to.have.property('data');
    expect(response.body.data).to.have.lengthOf(1);
  });

  it('should update a movie', async () => {
    const movie = new Movie({
      name: 'movie 5',
      description:
        'A popular influencer and his friends travel the world and film themselves in extreme situations. In Russia, they are invited to a mysterious escape room by an eccentric millionaire and see a given video success on social media in front of them. But no likes in the world can buy them free from the nightmare that awaits',
      trailerUrl: 'https://youtu.be/tiBE56vQ0Fg',
      genre: ['horror', 'thriller'],
      duration: '1:28',
      age: '15',
    });
    await movie.save();

    const updatedInfo = {
      name: 'follow me',
      age: '10',
    };

    await request
      .put(`/api/v1/movies/${movie._id}`)
      .send(updatedInfo)
      .expect(200);
    const foundUpdatedMovie = await Movie.findOne({ _id: movie._id });
    expect(foundUpdatedMovie.name).to.equal(updatedInfo.name);
  });

  it('should add a room to a movie', async () => {
    const movie = new Movie({
      name: 'movie 5',
      genre: ['horror', 'thriller'],
      duration: '1:28',
      age: '15',
    });
    await movie.save();

    const room = new Room({
      name: 'filmstaden',
      capacity: 4,
      cinema: '5fa653c0643c06586bba7d78',
      seats: [2, 2],
    });
    await room.save();

    await request
      .put(`/api/v1/movies/${movie._id}/room/${room._id}`)
      .expect(200);
    const foundUpdatedMovie = await Movie.findOne({ _id: movie._id });
    expect(foundUpdatedMovie.rooms).to.include(room._id);
  });

  it('should delete a movie', async () => {
    const movie = new Movie({
      name: 'movie 6',
      genre: ['horror', 'thriller'],
      duration: '1:28',
      age: '15',
    });
    await movie.save();

    const response = await request
      .delete(`/api/v1/movies/${movie._id}`)
      .expect(200);
    expect(response.body).to.include({ status: true });

    const deletedMovie = await Movie.findById(movie._id);
    expect(deletedMovie).to.be.null;
  });
});
