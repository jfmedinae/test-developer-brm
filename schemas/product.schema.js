const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().max(150);
const lotNumber = Joi.string().max(30);
const price = Joi.number().integer();
const amountAvailable = Joi.number().integer().min(0);
const entryDate = Joi.date();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  lotNumber: lotNumber.required(),
  amountAvailable: amountAvailable.required(),
  entryDate: entryDate.required(),
});

const updateProductSchema = Joi.object({
  name,
  price,
  lotNumber,
  amountAvailable,
  entryDate
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
