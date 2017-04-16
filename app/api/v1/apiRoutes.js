const boards = require('./boards/boards');

const apiRoutes = function routes(app) {
  app.use('/api/v1/boards', boards());
};

module.exports = apiRoutes;
