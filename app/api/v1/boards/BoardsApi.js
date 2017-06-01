const express = require('express');

const router = express.Router([]);

const Board = require('~/app/models/Board');

//const User = require('~/app/models/User');

// /api/v1/boards
const endpoint = function boardsEndopint() {
  router.get('/', (req, res) => {
    req.user = { id: "592c21d740143e4225c198b4" };
    Board.findByUser(req.user.id).then((boards) => {
      return res.send(boards);
    }).catch((err) => {
      return res.send(500);
    });
  });

  return router;
};

module.exports = endpoint;
