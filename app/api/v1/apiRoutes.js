const boardsEndopint = require('./boards/BoardsApi.js');
const tasksEndopint = require('./tasks/TasksApi.js');
const sessionsEndpoint = require('./sessions/SessionsApi.js');

const apiRoutes = function routes(app) {
  app.use('/api/v1/boards', boardsEndopint());
  app.use('/api/v1/boards', tasksEndopint());
  app.use('/api/v1', sessionsEndpoint());
};

module.exports = apiRoutes;
