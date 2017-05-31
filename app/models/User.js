const bcrypt = require('bcrypt-nodejs');

const globals = require('~/config/globals');

const db = globals.get('db');

// create users collection in DB
db.createCollection('users', 
  {
    validator: { $or: [
      { password: { $type: 'string', $exists: true } },
      { email: { $type: 'string', $exists: true } }
    ] }
  },
  (err, results) => {
    if (err) {
      return err;
    }
    console.log('Users created.');
    return results;
  }
);

// create collection indexes
db.collection('users').createIndex(
  { email: 1 }, { unique: true }, (err, result) => {
    if (err) {
      throw err;
    }
  }
);

function UserObject(args) {
  let password = args.password;
  const email = args.email;
  const id = args._id;

  const validPassword = (_password) => {
    return bcrypt.compareSync(_password, password);
  };

  const generateHash = (_password) => {
    return bcrypt.hashSync(_password, bcrypt.genSaltSync(8), null);
  };

  const getPassword = () => password;
  const setPassword = (_password) => {
    password = _password;
  };

  return {
    id,
    email,
    validPassword,
    generateHash,
    getPassword,
    setPassword
  };
}

const User = {
  collection() {
    return db.collection('users');
  },

  build(args) {
    let newUser = new UserObject(args);
    return newUser;
  }
};

module.exports = User;
