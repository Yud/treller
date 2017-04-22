const express = require('express');

const app = express();

const mongoose = require('mongoose');

const db = mongoose.connection;

require('./app/api/v1/apiRoutes')(app);

mongoose.connect('mongodb://localhost/treller_development');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  app.listen(3000);
});
