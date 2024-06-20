const boom = require('@hapi/boom');
const { Sequelize } = require('sequelize');

const { models } = require('../libs/sequelize');
const { PurchaseItem } = require('../db/models/purchase-item.model');
const sequelize = require('../libs/sequelize');

class PurchaseService {

  constructor(){}

  async find() {
    const purchase = await models.Purchase.findAll({
      include: [
        {
          association: 'user'
        },
        'items'
      ]
    });
    return purchase;
  }

  async findByUser(userId) {
    const purchases = await models.Purchase.findAll({
      where: {
        'user_id': userId
      },
      include: [
        {
          association: 'user'
        }
      ]
    });
    return purchases;
  }

  async findOne(id) {
    const purchase = await models.Purchase.findByPk(id, {
      include: [
        {
          association: 'user'
        },
        'items'
      ]
    });
    return purchase;
  }

  async findOneByUser(id, user) {
    const purchase = await models.Purchase.findOne({ 
      where: { id, userId: user.id },
      include: [
        {
          association: 'user'
        },
        'items'
      ]
    });
    return purchase;
  }

  async findRecordProductsByUser(userId) {
    const products = await sequelize.query(
      `SELECT * FROM purchases_items LEFT JOIN purchases ON purchases_items.purchase_id = purchases.id WHERE purchases.user_id = ${userId}`, 
      {
        model: PurchaseItem,
        mapToModel: true,
        include: [
          {
            association: 'product'
          }
        ]
      }
    );
    return products;
  }

  async create(data, user) {
    data.userId = user.id;
    const newPurchase = await models.Purchase.create(data);
    return newPurchase;
  }

  async addItems(data, user) {
    const purchasesUser = await this.findByUser(user.id);
    const itemsNotUserLogin = purchasesUser.filter((item) => item.userId !== user.id);
    if(itemsNotUserLogin > 0){
      boom.badData("The purchaseId in the items must belong to the user")
    }
    const newItems = await models.PurchaseItem.bulkCreate(data);
    return newItems;
  }
}

module.exports = PurchaseService;
