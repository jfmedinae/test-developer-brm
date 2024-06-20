'use strict';

const { USER_TABLE } = require('../models/user.model');
const { PRODUCT_TABLE } = require('../models/product.model');
const { PURCHASE_TABLE } = require('../models/purchase.model');
const { PURCHASE_ITEM_TABLE } = require('../models/purchase-item.model');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING(150),
        
      },
      phone: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING(100)
      },
      address: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING(150)
      },
      email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING(100),
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING(100)
      },
      recoveryToken: {
        allowNull: true,
        field: 'recovery_token',
        type: Sequelize.DataTypes.STRING
      },
      role: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING(50),
        defaultValue: 'Cliente'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
      }
    });
    await queryInterface.createTable(PRODUCT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: false,
      },
      lotNumber: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false,
        field: 'lot_number',
      },
      price: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      amountAvailable: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        field: 'amount_available',
      },
      entryDate: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        field: 'entry_date',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      }
    });
    await queryInterface.createTable(PURCHASE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      date: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: USER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      }
    });
    await queryInterface.createTable(PURCHASE_ITEM_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      amount: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      purchaseId: {
        field: 'purchase_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
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
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: PRODUCT_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });

  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(PURCHASE_ITEM_TABLE);
    await queryInterface.dropTable(PURCHASE_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  }
};
