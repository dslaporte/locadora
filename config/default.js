const dotenv = require('dotenv');
const path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const environment = String(process.env.NODE_ENV).toLowerCase();
const envPath = path.join(__dirname, `./../.env-${environment}`);

try {
  dotenv.config({
    path: envPath,
  });
} catch (err) {
  console.log(`${envPath} not found, load by environment variables`);
}

module.exports = {
  env: environment,
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 9000,
  database: {
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: process.env.DB_DIALECT || 'mysql',
  },
};
