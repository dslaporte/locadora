const express = require('express')
const controller = require('./customers-controller')
const routes = express.Router()

//cadastrar um cliente
routes.post('/customers', controller.create)
//buscar um cliente
routes.get('/customers', controller.findAll)
//buscar apenas um cliente pelo id
//customers/:id
routes.get('/customers/:id', controller.findOne)
//atualizar um cliente
routes.put('/customers/:id', controller.update)
//deleta um cliente
routes.delete('/customers/:id', controller.destroy)

module.exports = routes