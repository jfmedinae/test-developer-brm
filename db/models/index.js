const { User, UserSchema } = require('./user.model');
const { Product, ProductSchema } = require('./product.model');
const { Purchase, PurchaseSchema } = require('./purchase.model');
const { PurchaseItem, PurchaseItemSchema } = require('./purchase-item.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Purchase.init(PurchaseSchema, Purchase.config(sequelize));
  PurchaseItem.init(PurchaseItemSchema, PurchaseItem.config(sequelize));

  Purchase.associate(sequelize.models);
}

module.exports = setupModels;
