const express = require('express');

const router = express.Router([]);

const Board = require('~/app/models/Board');

const middleware = require('~/config/middleware');

//const User = require('~/app/models/User');

// /api/v1/boards
const endpoint = function boardsEndopint() {
  router.get('/', middleware.requireUser, (req, res) => {
    Board.findByUser(req.user.id).then((boards) => {
      return res.send(boards);
    }).catch((err) => {
      return res.send(500);
    });
  });

  return router;
};

module.exports = endpoint;
