const express = require('express');

const routes = express.Router();
const controller = require('./person-controller');

routes.post('/person', controller.create);
routes.get('/person', controller.findAll);
routes.get('/person/:id', controller.findOne);
routes.put('/person/:id', controller.update);
routes.delete('/person/:id', controller.destroy);

module.exports = routes;
