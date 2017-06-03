require('dotenv').config();

const express = require('express');

const app = express();

// run initializers and start server
require('./config/initializer')(app).then(() => {
  // load middleware
  require('./config/middleware').initialize(app);
  // load API routes
  require('./app/api/v1/apiRoutes')(app);

  app.listen(process.env.PORT);
  console.log(`Server started on port ${process.env.PORT}`);
}).catch((err) => {
  console.log(err);
});
