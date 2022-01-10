const express = require('express')
const routes = express.Router()
const controller = require('./products-controller')

routes.post('/products', controller.create)
routes.get('/products', controller.findAll)
routes.get('/products/:id', controller.findOne)
routes.put('/products/:id', controller.update)
routes.delete('/products/:id', controller.destroy)

module.exports = routes
