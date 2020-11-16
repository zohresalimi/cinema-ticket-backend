const request = require('supertest');
const app = require('../app');

describe('Testing root route', () => {
  it('it should has status code 200', (done) => {
    request(app)
      .get('/')
      .expect(200, { message: 'Hello' })
      .end((err) => {
        if (err) done(err);
        done();
      });
  });
});
