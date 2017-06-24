const ObjectID = require('mongodb').ObjectID;

const globals = require('~/config/globals');

const db = globals.get('db');

// create boards collection in DB
db.createCollection('boards',
  {
    validator: { $or: [
      { name: { $type: 'string', $exists: true } },
      { users: [{
        $user_id: 'ObjectId',
        $role: 'string',
        $exists: true }]
      },
      { tasks: [{
        $_id: { $type: 'ObjectID', $unique: true, $exists: true },
        $assignedTo: { $type: 'ObjectId' },
        $name: { $type: 'string', $exists: true },
        $description: { $type: 'text' } }]
      }
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

db.collection('boards').updateMany({ tasks: { $exists: false } }, { $set: { tasks: [] } });

function BoardFactory(args) {
  const name = args.name;
  const id = args._id;
  const users = args.users || [];

  const addOwner = (user) => {
    const _users = users.concat({
      user_id: user.id,
      role: 'owner'
    });
    return new BoardFactory({
      users: _users,
      id,
      name
    });
  };

  const getUsers = () => users;

  const toJSON = () => {
    return {
      users: getUsers(),
      name,
      id
    };
  };

  return {
    name,
    getUsers,
    addOwner,
    toJSON
  };
}

const Board = () => {
  const collection = () => db.collection('boards');

  const findByUser = (user_id) => {
    const _userId = new ObjectID(user_id);
    return collection().find({ 'users.user_id': _userId }).toArray();
  };

  const find = (id, userId) => {
    const _id = new ObjectID(id);
    const _userId = new ObjectID(userId);
    return collection().findOne({ _id, 'users.user_id': _userId });
  };

  const update = (id, userId, args) => {
    const _id = new ObjectID(id);
    const _userId = new ObjectID(userId);
    return collection()
      .findOneAndUpdate(
        { _id, 'users.user_id': _userId },
        { $set: { name: args.name } },
        { returnOriginal: false } // return updated version of doc
      );
  };

  const build = args => new BoardFactory(args);

  return {
    find,
    collection,
    build,
    update,
    findByUser
  };
};

module.exports = Board();
