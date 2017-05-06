const bcrypt = require('bcrypt-nodejs');

const globals = require('~/config/globals');

const db = globals.get('db');

// create users collection in DB
db.createCollection('users', 
  {
    validator: { $or: [
      { password: { $type: 'string' } },
      { email: { $type: 'string' } }
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
  this.password = args.password;
  this.email = args.email;
  this.id = args._id;
  const self = this;

  this.validPassword = (_password) => {
    return bcrypt.compareSync(_password, self.password);
  };

  this.generateHash = (_password) => {
    return bcrypt.hashSync(_password, bcrypt.genSaltSync(8), null);
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
