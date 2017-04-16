const request = require('request');

const boards = require('~/app/api/v1/boards/boards');

const app = require('express')();

const chai = require('chai');

const expect = require('chai').expect;

app.use('/api/v1/boards', boards());

app.listen(9090);

describe('/api/v1/boards', () => {
  
  describe('/', () => {
    it('should return boards', () => {
      request
        .get('http://localhost:9090/api/v1/boards')
        .on('response', (response) => {
          expect(response.statusCode).to.equal(200);
        });
    });
  });

});
