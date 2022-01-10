const config = require('config');
const fs = require('fs');
const path = require('path');
// const util = require('../../src/helpers/util');

// let Sequelize;
// if (config.env === 'test') {
//   Sequelize = require('sequelize-mock');
// } else {
const Sequelize = require('sequelize');
// }

const db = {};

const createDBConnection = () => {
  const configSequelize = {
    logging: console.log,
    dialect: config.database.dialect,
    port: config.database.port,
    host: config.database.host,
    query: { raw: true },
  };

  return new Sequelize(
    config.database.name,
    config.database.username,
    config.database.password,
    configSequelize,
  );
};

let sequelizeConnection = createDBConnection();

sequelizeConnection
  .authenticate()
  .then(() => {
    // config.env !== 'test'
    // ?
    console.info('Connection has been established successfully.');
    // : Promise.resolve();
  });

// .catch((err) => {
//   config.env !== 'test'
//     ? console.info('Unable to connect to the database:', err)
//     : Promise.resolve({});
// });

function recurseReadDirectory(directory) {
  return fs.statSync(directory).isDirectory()
    ? Array.prototype.concat(
      ...fs
        .readdirSync(directory)
        .map((file) => recurseReadDirectory(path.join(directory, file))),
    )
    : directory;
}

const srcPath = path.normalize(path.join(__dirname, '../src'));

recurseReadDirectory(srcPath)
  .filter((file) => file.indexOf('-model.js') >= 0)
  .forEach((file) => {
    // const model = sequelizeConnection.import(file);
    const model = require(file)(sequelizeConnection, Sequelize.DataTypes);

    db[model.name] = model;
  });

const sequelize = () => {
  if (!sequelizeConnection) {
    sequelizeConnection = createDBConnection();
  }
  return sequelizeConnection;
};

module.exports = {
  Sequelize,
  sequelize,
};
