const Joi = require('joi');

const id = Joi.number().integer();
const date = Joi.date();
const purchaseId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const getPurchaseSchema = Joi.object({
  id: id.required(),
});

const createPurchaseSchema = Joi.object({
  date: date.required(),
});

const addItemSchema = Joi.array().items({
  purchaseId: purchaseId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

module.exports = { getPurchaseSchema, createPurchaseSchema, addItemSchema };
