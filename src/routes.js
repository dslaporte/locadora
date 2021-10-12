const express = require('express')
const Customer = require('./customers')
const routes = express.Router()
const httpStatus = require('http-status')

//cria um novo array de customers
const customers = []

const RESPONSE_NOT_FOUND = {
    "message": "Customer not found!"
}

//cria-se uma rota com o endereço /
routes.get('/helloworld', (req, res) => {
    //req - request : requisição
    //res - response : resposta do servidor
    //resposta do servidor será hello world!
    res.status(httpStatus.OK).send('Hello World!')
})

//cadastrar um cliente
routes.post('/customers', (req, res) => {
    const { name, cpf, birthday } = req.body
    const id = customers.length + 1
    const customer = new Customer(id, name, cpf, birthday)
    customers.push(customer)
    return res.status(httpStatus.CREATED).json(customer)
})

//buscar um cliente
routes.get('/customers', (req, res) => {
    return res.status(httpStatus.OK).json(customers)
})

//buscar apenas um cliente pelo id
//customers/{id}
//customers/:id
routes.get('/customers/:id', (req, res) => {
    //x = customer (objeto)
    const { id } = req.params
    //= atribuição
    //= = compara valores
    //= = = compara valores considerando o valor e o tipo
    const response = customers.find(x => x.id == id)
    if (!response) {
        //404
        return res.status(httpStatus.NOT_FOUND).json(RESPONSE_NOT_FOUND)
    }
    return res.status(httpStatus.OK).json(response)
})

//atualizar um cliente
routes.put('/customers/:id', (req, res) => {
    //obter o parametro
    const { id } = req.params
    //obter os dados que eu devo atualizar (o payload)
    const { name, cpf, birthday } = req.body
    //identificar dentro do array o meu id a ser atualizado
    //x = é o meu objeto customer
    //o array inicia em zero
    const idx = customers.findIndex(x => x.id == id)
    if (idx < 0) {
        return res.status(httpStatus.NOT_FOUND).json(RESPONSE_NOT_FOUND)
    }
    const updatedCustomer = customers[idx]
    //atualizar os valores de cada propriedade com os novos valores a ser atualizados
    if (name) {
        updatedCustomer.name = name
    }
    if (cpf) {
        updatedCustomer.cpf = cpf
    }
    if (birthday) {
        updatedCustomer.birthday = birthday
    }
    updatedCustomer.updated_at = new Date()
    customers[idx] = updatedCustomer
    return res.status(httpStatus.OK).json(customers.find(x => x.id == id))
})

routes.delete('/customers/:id', (req, res) => {
    //extrair o id que deve ser excluído
    const id = req.params.id
    //pesquisar o id dentro do array
    const idx = customers.findIndex(x => x.id == id)
    if (idx < 0) {
        //404
        return res.status(httpStatus.NOT_FOUND).json(RESPONSE_NOT_FOUND)
    }
    customers.splice(idx, 1)
    //204
    return res.status(httpStatus.NO_CONTENT).send()
})


module.exports = routes