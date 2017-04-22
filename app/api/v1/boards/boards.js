const express = require('express');

const router = express.Router([]);

const Board = require('~/app/models/Board');

const endpoint = function boardsEndopint() {
  router.get('/', (req, res) => {
    Board.find({}, (err, docs) => {
      if (err) {
        return res.send(500);
      }
      return res.send(docs);
    });
  });

  return router;
};

module.exports = endpoint;
