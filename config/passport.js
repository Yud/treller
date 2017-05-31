const LocalStrategy = require('passport-local').Strategy;

const User = require('~/app/models/User');

const passportStrategies = (passport) => {
  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    console.log(user.id)
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.collection().findById(id, (err, user) => {
      done(err, user);
    });
  });

  // sign in strategy
  passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    User.collection().findOne({ email }, (err, doc) => {
      if (err) {
        return err;
      }

      if (!doc) {
        console.log('User not found');
        return done(null, false, { message: 'Incorrect username.' });
      }

      const user = User.build(doc);

      if (!user.validPassword(password)) {
        console.log('Invalid Pass');
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    });
  }));

  // sign up stategy
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
     // allows us to pass back the entire request to the callback
    passReqToCallback: true
  }, (req, email, password, done) => {
    let newUser = User.build({ email });
    newUser.setPassword(newUser.generateHash(password));

    User.collection().insertOne({
      password: newUser.getPassword(),
      email: newUser.email
    }, (dbErr, userDoc) => {
      if (dbErr) {
        if (dbErr.name === 'MongoError' && dbErr.code === 11000) {
          // Duplicate email
          return done(null, false, { message: 'Email already taken' });
        }
        throw dbErr;
      }

      newUser.id = userDoc.insertedId;
      return done(null, newUser);
    });
  }));
};


module.exports = passportStrategies;
