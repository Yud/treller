require('dotenv').config({ path: '.env.test' });

//const request = require('request');

//const mongoose = require('mongoose');

//const sessions = require('~/app/api/v1/sessions/SessionsApi');

//const app = require('express')();

//const expect = require('chai').expect;

//const apiRoot = `http://${process.env.HOST}:${process.env.PORT}/api/v1`;

//const sinon = require('sinon');

//require('~/config/initializer')(app);

//app.use('/api/v1/SessionsApi', sessions());

//describe('/api/v1', () => {
  //describe('/login', () => {
    //it('should login the user', (done) => {
      //const payload = {
        //username: 'test@test.com',
        //password: '123456'
      //};

      //const requestParams = {
        //method: 'POST',
        //uri: `${apiRoot}/login`,
        //json: payload
      //};

      //sinon
        //.stub(mongoose.Model, 'findOne')
        //.yields(null, { id: 4 });

      //request(requestParams, (error, response, body) => {
        //expect(response.statusCode).to.eql(200);
        //expect(JSON.parse(body)).to.be.an('array');
        //done();
      //});
    //});
  //});
//});

