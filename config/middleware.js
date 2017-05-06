const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const passport = require('passport');

const morgan = require('morgan')

const initilizeMiddleware = (app) => {
  app.use(cookieParser({ secret: process.env.SESSION_SECRET }));
  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(morgan('dev'));
};

module.exports = initilizeMiddleware;
