require('dotenv').config();

const express = require('express');

const app = express();

require('./app/api/v1/apiRoutes')(app);
require('./config/initializer')(app);
