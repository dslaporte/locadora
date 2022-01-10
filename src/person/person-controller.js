const httpStatus = require('http-status');
const PersonDAO = require('./person-dao');

const DAO = new PersonDAO();

const { CUSTOMER_NOT_FOUND } = require('../base/consts');

async function create(req, res) {
  const {
    name, document, isAdmin, isCustomer, birthday,
  } = req.body;

  res.status(httpStatus.CREATED).json(DAO.create({
    name,
    documentType: document.type,
    document: document.number,
    isAdmin,
    isCustomer,
    birthday,
  }));
}

function destroy(req, res) {
  const { id } = req.params;
  DAO.delete(id);
  return res.status(httpStatus.NO_CONTENT).send();
}

async function findOne(req, res) {
  const { id } = req.params;
  const person = await DAO.findOne(id);
  if (!person) {
    res.status(httpStatus.NOT_FOUND).json(CUSTOMER_NOT_FOUND);
  }
  res.status(httpStatus.OK).json(person);
}

function findAll(req, res) {
  res.status(httpStatus.OK).json(DAO.findAll());
}

function update(req, res) {
  const { id } = req.params;
  const { name, birthday } = req.body;
  const customer = DAO.findOne(id);
  if (!customer) {
    return res.status(httpStatus.NOT_FOUND).json(CUSTOMER_NOT_FOUND);
  }
  if (name) {
    customer.name = name;
  }
  if (birthday) {
    customer.birthday = birthday;
  }
  return res.status(httpStatus.OK).json(DAO.update(customer, id));
}

module.exports = {
  update,
  findOne,
  findAll,
  create,
  destroy,
};
