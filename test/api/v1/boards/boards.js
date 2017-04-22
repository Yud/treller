const request = require('request');

const boards = require('~/app/api/v1/boards/boards');

const app = require('express')();

const expect = require('chai').expect;

const mongoose = require('mongoose');

const db = mongoose.connection;

app.use('/api/v1/boards', boards());

mongoose.connect('mongodb://localhost/treller_test');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  app.listen(9090);
});

describe('/api/v1/boards', () => {
  describe('/', () => {
    it('should return boards', (done) => {
      request
        .get('http://localhost:9090/api/v1/boards', (error, response, body) => {
          expect(response.statusCode).to.eql(200);
          expect(JSON.parse(body)).to.be.an('array');
          done();
        });
    });
  });
});
