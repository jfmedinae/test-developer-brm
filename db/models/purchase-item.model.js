const { Model, DataTypes, Sequelize } = require('sequelize');

const { PURCHASE_TABLE } = require('./purchase.model');
const { PRODUCT_TABLE } = require('./product.model');

const PURCHASE_ITEM_TABLE = 'purchases_items';

const PurchaseItemSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  purchaseId: {
    field: 'purchase_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PURCHASE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  }
}

class PurchaseItem extends Model {
  
  static associate(models) {
    this.belongsTo(models.Product, {
      as: 'product',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PURCHASE_ITEM_TABLE,
      modelName: 'PurchaseItem',
      timestamps: false
    }
  }
}

module.exports = { PurchaseItem, PurchaseItemSchema, PURCHASE_ITEM_TABLE };
