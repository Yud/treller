const express = require('express');

const router = express.Router([]);

const passport = require('passport');

require('~/config/passport')(passport);

const endpoint = function sessionsEndpoint() {
  router.post('/login',
    passport.authenticate('local-signin', { failWithError: true }),
    // If this function gets called, authentication was successful.
    (req, res) => res.send(req.user),
    // If this function gets called, login failed & an error will be returned
    (err, req, res, next) => {
      return res.json(err);
    }
  );

  router.post('/logout', (req, res) => {
    req.logout();
    res.send(200);
  });

  router.post('/signup',
    passport.authenticate('local-signup', { failWithError: true }),
    // If this function gets called, signup was successful.
    // Otherwise, Passport will respond with a 401 Unauthorized status.
    (req, res) => res.send(req.user),
    // If this function gets called, signup failed & an error will be returned
    (err, req, res, next) => {
      return res.json(err);
    }
  );

  return router;
};

module.exports = endpoint;
