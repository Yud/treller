const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

const morgan = require('morgan');

const User = require('~/app/models/User');

const mongo = require('mongodb');

const getUserIdFromToken = (req, res, next) => {
  const tokenHeader = req.get('Authorization');
  if (tokenHeader && typeof tokenHeader === 'string') {
    try {
      const decoded = jwt.verify(tokenHeader, process.env.JWT_SECRET);
      req.userId = decoded.id;
      return next();
    } catch(err) {
      console.log(err.message);
    }
  }
  return next();
};

const requireUser = (req, res, next) => {
  if (!req.userId) {
    return res.status(401).send({ message: 'Not authorized' });
  }
  const id = new mongo.ObjectID(req.userId);
  User.collection().findOne({ _id: id }).then((doc) => {
    if (!doc) {
      console.log(req.userId);
      return res.status(401).send({ message: 'Not authorized' });
    }
    req.user = User.build(doc);
    next();
  }).catch((err) => {
    console.log(err);
    return res.status(500).send();
  });
};

const initilizeMiddleware = (app) => {
  app.use(cookieParser({ secret: process.env.SESSION_SECRET }));
  app.use(bodyParser.json());
  app.use(getUserIdFromToken);
  app.use(morgan('dev'));
};

module.exports = { initialize: initilizeMiddleware, requireUser: requireUser };
