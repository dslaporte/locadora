const DAO = require('../base/dao');
const sequelize = require('../../database/connection').sequelize();

const { person } = sequelize.models;

class PersonDAO extends DAO {
  constructor() {
    super(person);
  }
}

module.exports = PersonDAO;
