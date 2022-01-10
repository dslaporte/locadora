const DAO = require('../base/dao');
// const Products = require('./products-model')
const products = [];
const httpStatus = require('http-status');

const daoProducts = new DAO(products);
const { INVALID_STOCK, PRODUCT_NOT_FOUND } = require('../base/consts');

function create(req, res) {
  const {
    description, quantityStock, quantityAvailable, value,
  } = req.body;
  if (quantityStock !== quantityAvailable) {
    res.status(httpStatus.BAD_REQUEST).json(INVALID_STOCK);
  }
  const id = products.length + 1;
  const product = new Products({
    id, description, quantityStock, quantityAvailable, value,
  });
  res.status(httpStatus.CREATED).json(daoProducts.create(product));
}

function destroy(req, res) {
  const { id } = req.params;
  daoProducts.delete(id);
  return res.status(httpStatus.NO_CONTENT).send();
}

function findOne(req, res) {
  const { id } = req.params;
  const product = daoProducts.findOne(id);
  if (!product) {
    res.status(httpStatus.NOT_FOUND).json(PRODUCT_NOT_FOUND);
  }
  res.status(httpStatus.OK).json();
}

function findAll(req, res) {
  res.status(httpStatus.OK).json(daoProducts.findAll());
}

function update(req, res) {
  const { id } = req.params;
  const {
    description, quantityStock, quantityAvailable, value,
  } = req.body;
  const product = daoProducts.findOne(id);
  if (!product) {
    return res.status(httpStatus.NOT_FOUND).json(PRODUCT_NOT_FOUND);
  }
  if (description) {
    product.description = description;
  }
  if (quantityStock) {
    product.quantityStock = quantityStock;
  }
  if (quantityAvailable) {
    product.quantityAvailable = quantityAvailable;
  }
  if (value) {
    product.value = value;
  }
  return res.status(httpStatus.OK).json(daoProducts.update(product, id));
}

module.exports = {
  update,
  findOne,
  findAll,
  create,
  destroy,
};
