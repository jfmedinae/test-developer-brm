const { Model, DataTypes, Sequelize } = require('sequelize');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  lotNumber: {
    type: DataTypes.STRING(30),
    allowNull: false,
    field: 'lot_number',
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amountAvailable: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'amount_available',
  },
  entryDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'entry_date',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  }
}


class Product extends Model {

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}

module.exports = { Product, ProductSchema, PRODUCT_TABLE };
