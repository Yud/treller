require('dotenv').config();

const express = require('express');

const app = express();

// load middleware
require('./config/middleware')(app);

// run initializers and start server
require('./config/initializer')(app).then(() =>

  // load API routes
  require('./app/api/v1/apiRoutes')(app)
);
