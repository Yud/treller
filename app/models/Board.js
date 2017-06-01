const globals = require('~/config/globals');

const db = globals.get('db');

// create boards collection in DB
db.createCollection('boards',
  {
    validator: { $or: [
      { name: { $type: 'string', $exists: true } },
      { users: [{ $user_id: 'ObjectId', $exists: true }] }
    ] }
  },
  (err, results) => {
    if (err) {
      return err;
    }
    console.log('Boards created.');
    return results;
  }
);

const Board = () => {
  const collection = () => db.collection('boards');
  const findByUser = (id) => {
    return collection().find({ users: { user_id: id } }).toArray();
  };

  return {
    collection,
    findByUser
  }
};

module.exports = Board();
