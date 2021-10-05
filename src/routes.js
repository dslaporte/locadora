const express = require('express')
const Customer = require('./customers')
const routes = express.Router()

//cria um novo array de customers
const customers = []

//cria-se uma rota com o endereço /
routes.get('/helloworld', (req, res) => {
    //req - request : requisição
    //res - response : resposta do servidor
    //resposta do servidor será hello world!
    res.send('Hello World!')
})

//cadastrar um cliente
routes.post('/customers', (req, res) => {
    const { name, cpf, birthday } = req.body
    const id = customers.length + 1
    const customer = new Customer(id, name, cpf, birthday)
    customers.push(customer)
    return res.json(customer)
})

//buscar um cliente
routes.get('/customers', (req, res) => {
    return res.json(customers)
})

//atualizar um cliente
//TO-DO

//buscar apenas um cliente pelo id
//TO-DO

module.exports = routes