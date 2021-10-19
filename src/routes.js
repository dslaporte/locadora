const express = require('express')
const routes = express.Router()
const httpStatus = require('http-status')
const DAO = require('./base/dao')
const Products = require('./products')

const products = []
const daoProducts = new DAO(products)

//cria um novo array de customers


//cadastrar um cliente
routes.post('/products', (req, res) => {
    const { description, quantityStock , quantityAvailable, value } = req.body
    const id = products.length + 1
    const product = new Products({id, description, quantityStock , quantityAvailable, value})
    return res.status(httpStatus.CREATED).json(daoProducts.create(product))
})

//buscar um cliente
routes.get('/products', (req, res) => {
    return res.status(httpStatus.OK).json(products)
})

//buscar apenas um cliente pelo id
//product/{id}
//product/:id
routes.get('/products/:id', (req, res) => {
    //x = customer (objeto)
    const { id } = req.params
    //= atribuição
    //= = compara valores
    //= = = compara valores considerando o valor e o tipo
    const response = products.find(x => x.id == id)
    if (!response) {
        //404
        return res.status(httpStatus.NOT_FOUND).json(RESPONSE_NOT_FOUND)
    }
    return res.status(httpStatus.OK).json(response)
})

//atualizar um cliente
routes.put('/products/:id', (req, res) => {
    // {
    //     "description": "Exterminador do futuro",
    //     "quantityStock": 5,
    //     "quantityAvailable": 5,
    //     "value": 2.50
    // }

    //obter o parametro
    const { id } = req.params
    //obter os dados que eu devo atualizar (o payload)
    const { description, quantityStock, quantityAvailable, value } = req.body
    //identificar dentro do array o meu id a ser atualizado
    //x = é o meu objeto customer
    //o array inicia em zero
    const idx = products.findIndex(x => x.id == id)
    if (idx < 0) {
        return res.status(httpStatus.NOT_FOUND).json(RESPONSE_NOT_FOUND)
    }
    const updateProduct = products[idx]
    //atualizar os valores de cada propriedade com os novos valores a ser atualizados
    if (description) {
        updateProduct.description = description
    }
    if (quantityStock) {
        updateProduct.quantityStock = quantityStock
    }
    if (quantityAvailable) {
        updateProduct.quantityAvailable = quantityAvailable
    }
    if (value) {
        updateProduct.value = value
    }

    updateProduct.updated_at = new Date()
    products[idx] = updateProduct
    return res.status(httpStatus.OK).json(products.find(x => x.id == id))
})

routes.delete('/product/:id', (req, res) => {
    //extrair o id que deve ser excluído
    const id = req.params.id
    //pesquisar o id dentro do array
    const idx = products.findIndex(x => x.id == id)
    if (idx < 0) {
        //404
        return res.status(httpStatus.NOT_FOUND).json(RESPONSE_NOT_FOUND)
    }
    products.splice(idx, 1)
    //204
    return res.status(httpStatus.NO_CONTENT).send()
})


// DAO - Data Access Object ()
// Model: Classes 
// Classe -> Tables
// Instruções SQL 
// ORM: Object Relational Model


module.exports = routes

