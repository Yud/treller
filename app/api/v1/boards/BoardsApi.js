const express = require('express');

const router = express.Router([]);

const Board = require('~/app/models/Board');

const requireUser = require('~/config/middleware').requireUser;

// /api/v1/boards
const endpoint = function boardsEndopint() {
  router.get('/', requireUser, (req, res) => {
    Board.findByUser(req.user.id).then((boards) => {
      return res.send(boards);
    }).catch((err) => {
      return res.send(500);
    });
  });

  router.post('/', requireUser, (req, res) => {
    const newBoard = Board.build({ name: req.body.name }).addOwner(req.user);
    Board.collection().insertOne({
      name: newBoard.name,
      users: newBoard.getUsers()
    }).then((boardDoc) => {
      newBoard.id = boardDoc.insertedId;
      return res.send({ board: newBoard.toJSON() });
    }).catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
  });

  router.put('/:id', requireUser, (req, res) => {
    const whitelist = ['name'];
    const boardParams = Object.keys(req.body).reduce((validParams, key) => {
      if (whitelist.indexOf(key) > -1) {
        validParams[key] = req.body[key];
      }
      return validParams;
    }, {});

    Board.update(req.params.id, req.user.id, boardParams)
      .then((boardDoc) => {
        res.send(Board.build(boardDoc.value).toJSON());
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return router;
};

module.exports = endpoint;
