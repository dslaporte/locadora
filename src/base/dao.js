class DAO {
  constructor(model) {
    this.model = model;
  }

  create(object) {
    return this.model.create(object).then((data) => data.get({ plain: true }));
  }

  findOne(id) {
    return this.model.findByPk(id);
  }

  findAll(options) {
    return this.model.findAll(options);
  }

  update(updatedObject, id) {
    return this.model.update(updatedObject, id);
  }

  delete(where) {
    return this.model.destroy({ where });
  }
}

module.exports = DAO;
