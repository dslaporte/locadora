const express = require('express');
const customerRoutes = require('./person/person-routes');
const productRoutes = require('./products/products-routes');
const config = require('../config/default');

const { host, port } = config;

const app = express();

app.use(express.json());
app.use('/', [
  customerRoutes,
  productRoutes,
]);

app.listen(port, () => {
  console.log(`Example app listening at ${host}:${port}`);
});
