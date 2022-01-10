module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('person', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      document: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      documentType: {
        type: Sequelize.STRING(4),
        allowNull: false,
        field: 'document_type',
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
        field: 'is_admin',
      },
      isCustomer: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: true,
        field: 'is_customer',
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('person');
  },
};
