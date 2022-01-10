module.exports = function (sequelize, DataTypes) {
  const person = sequelize.define('person', {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    document: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    documentType: {
      type: DataTypes.STRING(4),
      allowNull: false,
      field: 'document_type',
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
      field: 'is_admin',
    },
    isCustomer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: true,
      field: 'is_customer',
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, {
    tableName: 'person',
    freezeTableName: true,
    timestamps: false,
  });

  return person;
};
