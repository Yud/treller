const express = require('express');

const router = express.Router([]);

const endpoint = function boardsEndopint() {
  router.get('/', (req, res) => {
    res.send('Hello World');
  });

  return router;
};

module.exports = endpoint;
