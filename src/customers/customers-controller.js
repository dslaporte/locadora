const Customer = require('./customers.model')
const httpStatus = require('http-status')
const DAO = require('../base/dao')
const customers = []
//criamos a instancia da classe dao
const daoCustomer = new DAO(customers)

const RESPONSE_NOT_FOUND = {
    "message": "Customer not found!"
}

function create (req, res) {
    const { name, cpf, birthday } = req.body
    const id = customers.length + 1
    const customer = new Customer(id, name, cpf, birthday)
    return res.status(httpStatus.CREATED).json(daoCustomer.create(customer))
}

function findAll (req, res) {
    return res.status(httpStatus.OK).json(daoCustomer.findAll())
}

function findOne (req, res) {
    //x = customer (objeto)
    const { id } = req.params
    //= atribuição
    //= = compara valores
    //= = = compara valores considerando o valor e o tipo
    const response = daoCustomer.findOne(id)
    if (!response) {
        //404
        return res.status(httpStatus.NOT_FOUND).json(RESPONSE_NOT_FOUND)
    }
    return res.status(httpStatus.OK).json(response)
}

function update (req, res) {
    //obter o parametro
    const { id } = req.params
    //obter os dados que eu devo atualizar (o payload)
    const { name, cpf, birthday } = req.body
    //identificar dentro do array o meu id a ser atualizado
    //x = é o meu objeto customer
    //o array inicia em zero    
    const customer = daoCustomer.findOne(id)
    if (!customer) {
        return res.status(httpStatus.NOT_FOUND).json(RESPONSE_NOT_FOUND)
    }
    //atualizar os valores de cada propriedade com os novos valores a ser atualizados
    if (name) {
        customer.name = name
    }
    if (cpf) {
        customer.cpf = cpf
    }
    if (birthday) {
        customer.birthday = birthday
    }
    customer.updated_at = new Date()
    return res.status(httpStatus.OK).json(daoCustomer.update(customer, id))
}

function destroy (req, res) {
    //extrair o id que deve ser excluído
    const id = req.params.id
    //pesquisar o id dentro do array
    const customer = daoCustomer.findOne(id)
    if (!customer) {
        return res.status(httpStatus.NOT_FOUND).json(RESPONSE_NOT_FOUND)
    }
    //204
    daoCustomer.destroy(id)
    return res.status(httpStatus.NO_CONTENT).send()
}

module.exports = {
    create,
    findAll,
    findOne,
    update,
    destroy
}

// class CustomerController {
//      create () {}
// }

// module.exports = new CustomerController()