const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const PURCHASE_TABLE = 'purchases';

const PurchaseSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  date: {
    allowNull: false,
    type: DataTypes.DATE
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
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
  },
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.items && this.items.length > 0) {
        return this.items.reduce((total, item) => {
          return total + (item.price * item.PurchaseItem.amount);
        }, 0);
      }
      return 0;
    }
  }
}


class Purchase extends Model {

  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
    });
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.PurchaseItem,
      foreignKey: 'purchaseId',
      otherKey: 'productId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PURCHASE_TABLE,
      modelName: 'Purchase',
      timestamps: false
    }
  }
}

module.exports = { Purchase, PurchaseSchema, PURCHASE_TABLE };
