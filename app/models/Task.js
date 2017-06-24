const globals = require('~/config/globals');

const ObjectID = require('mongodb').ObjectID;

const db = globals.get('db');

const TaskFactory = function tf(args) {
  this.name = args.name;
  this.description = args.description;
};

const taskToDoc = doc => Object.assign({}, { _id: new ObjectID() }, doc);

const Task = () => {
  const collection = () => db.collection('boards');

  const all = (args) => {
    const promise = new Promise((resolve, reject) => {
      console.log(args);
      collection()
        .findOne({
          _id: new ObjectID(args.boardId),
          'users.user_id': new ObjectID(args.userId)
        })
        .then(board => resolve(board.tasks))
        .catch(err => reject(err));
    });
    return promise;
  };

  const build = args => new TaskFactory(args);

  const create = (task, args) => {
    const promise = new Promise((resolve, reject) => {
      const doc = taskToDoc(task);
      collection().update({
        _id: new ObjectID(args.boardId),
        'users.user_id': new ObjectID(args.userId)
      }, {
        $push: { tasks: doc }
      }).then((resp) => {
        console.log(resp.result);
        resolve(doc);
      }).catch((err) => {
        console.log(err);
        reject(err);
      });
    });
    return promise;
  };

  return {
    all,
    build,
    create
  };
};

module.exports = Task();
