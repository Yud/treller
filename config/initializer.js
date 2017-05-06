require('dotenv').config();

const fs = require('fs');

const normalizedPath = require('path').join(__dirname, 'initializers');

const runInitializers = (app) => {
  const arr = fs.readdirSync(normalizedPath).map(file =>
   require(`./initializers/${file}`)(app)
  );
  return arr;
};

const init = (app) => {
  const promise = new Promise((resolve, reject) => {
    console.log('Starting server...');
    Promise.all(runInitializers(app)).then(() => {
      app.listen(process.env.PORT);
      console.log(`Server started on port ${process.env.PORT}`);
      return resolve();
    }).catch((reason) => {
      console.log('An error occured during initializetion process:');
      console.log(reason);
      console.log('Exiting process');
      process.exit();
    });
  });
  return promise;
};

module.exports = init;
