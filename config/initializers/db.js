const MongoClient = require('mongodb').MongoClient;

const globals = require('~/config/globals');

const initilize = (app) => {
  const promise = new Promise((resolve, reject) => {
    console.log('Connecting to database...');

    MongoClient.connect(process.env.DB_URI, (err, db) => {
      if (err) {
        console.log('Could not connect to database');
        return reject(err);
      }

      console.log('Connected to database!');
      globals.set('db', db);
      return resolve();
    });
  });

  return promise;
};

module.exports = initilize;
