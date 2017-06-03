const express = require('express');

const router = express.Router([]);

const User = require('~/app/models/User');

const jwt = require('jsonwebtoken');

const endpoint = function sessionsEndpoint() {
  router.post('/login', (req, res) => {
    User.collection().findOne({ email: req.body.email }).then((doc) => {
      if (!doc) {
        return res.status(404).send();
      }

      const user = User.build(doc);

      if (!user.validPassword(req.body.password)) {
        return res.status(500).send({ message: 'Incorrect password.' });
      }

      const payload = { id: user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      return res.send({ token });
    }).catch((err) => {
      console.log(err);
    });
  });

  router.post('/signup', (req, res) => {
    const newUser = User.build({ email: req.body.email });
    newUser.setPassword(newUser.generateHash(req.body.password));

    User.collection().insertOne({
      password: newUser.getPassword(),
      email: newUser.email
    }).then((userDoc) => {
      const payload = { id: userDoc.insertedId };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      return res.send({ token });
    }).catch((dbErr) => {
      console.log(dbErr);
      if (dbErr.name === 'MongoError' && dbErr.code === 11000) {
        return res.status(500).send({ message: 'Email already taken' });
      }
      throw dbErr;
    });
  });

  return router;
};

module.exports = endpoint;
