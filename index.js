const express = require('express');

const app = express();

require('./app/api/v1/apiRoutes')(app);

app.listen(3000);
