require('dotenv').config();

const fs = require('fs');

const normalizedPath = require('path').join(__dirname, 'initializers');

const runInitializers = () => {
  const arr = fs.readdirSync(normalizedPath).map((file) => {
    return require(`./initializers/${file}`)();
  });
  return arr;
};

const init = (app) => {
  console.log('Starting server...');
  Promise.all(runInitializers()).then(() => {
    app.listen(process.env.PORT);
    console.log(`Server started on port ${process.env.PORT}`);
  }).catch((reason) => {
    console.log('An error occured during initializetion process:');
    console.log(reason);
    console.log('Exiting process');
    process.exit();
  });
};

module.exports = init;
