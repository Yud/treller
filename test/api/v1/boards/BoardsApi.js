require('dotenv').config({ path: '.env.test' });

console.log(process.env.PORT);

const request = require('request');

const boards = require('~/app/api/v1/boards/BoardsApi');

const app = require('express')();

const express = require('express');

const router = express.Router([]);

const Board = require('~/app/models/Board');

const expect = require('chai').expect;

const apiRoot = `http://${process.env.HOST}:${process.env.PORT}/api/v1`;

require('~/config/initializer')(app);

app.use('/api/v1/BoardsApi', boards());

describe('/api/v1/BoardsApi', () => {
  describe('/', () => {
    it('should return boards', (done) => {
      request
        .get(`${apiRoot}/BoardsApi`, (error, response, body) => {
          expect(response.statusCode).to.eql(200);
          expect(JSON.parse(body)).to.be.an('array');
          done();
        });
    });
  });
});
