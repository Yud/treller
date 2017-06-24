const express = require('express');

const router = express.Router([]);

const Task = require('~/app/models/Task');

const requireUser = require('~/config/middleware').requireUser;

const endpoint = function tasksEndpoint() {
  router.get('/:boardId/tasks', requireUser, (req, res) => {
    Task.all({
      userId: req.user.id, boardId: req.params.boardId
    })
    .then(tasks => res.send(tasks))
    .catch(err => res.sendStatus(500));
  });

  router.post('/:boardId/tasks', requireUser, (req, res) => {
    const task = Task.build({
      name: req.body.name,
      description: req.body.description,
      assignedTo: req.body.assignedTo
    });
    Task.create(task, { userId: req.user.id, boardId: req.params.boardId })
      .then(doc => res.send(doc))
      .catch(err => res.sendStatus(500));
  });

  router.put('/:boardId/tasks/:taskId', requireUser, (req, res) => {
    console.log('TODO');
  });

  return router;
};

module.exports = endpoint;
