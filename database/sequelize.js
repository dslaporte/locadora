const Fs = require('fs');
const Path = require('path');
const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const environment = process.env.NODE_ENV;
const envPath = Path.join(__dirname, `../.env-${environment}`);

try {
  Fs.statSync(envPath);
  dotenv.config({ path: envPath, silent: true });
} catch (err) {
  console.error('Error to load database variables ', err);
}

module.exports = {
  [environment]: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_TYPE || 'mysql',
  },
};
