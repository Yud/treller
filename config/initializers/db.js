const mongoose = require('mongoose');

const db = mongoose.connection;

const initilize = () => {
  const promise = new Promise((resolve, reject) => {
    console.log('Connecting to database...');

    mongoose.connect(process.env.DB_URI);

    db.on('error', () => {
      reject('Could not connect to database');
    });

    db.once('open', () => {
      console.log('Connected to database!')
      resolve();
    });
  });

  return promise;
};

module.exports = initilize;
