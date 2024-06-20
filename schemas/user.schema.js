const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().max(150);
const phone = Joi.string().max(100);
const address = Joi.string().max(150);
const email = Joi.string().email().max(100);
const password = Joi.string().min(8).max(100);
const role = Joi.string().valid('Administrador', 'Cliente');

const createUserSchema = Joi.object({
  name: name.required(),
  phone: phone.required(),
  address: address.required(),
  email: email.required(),
  password: password.required(),
  role: role.required()
});

const updateUserSchema = Joi.object({
  name,
  phone,
  address,
  email,
  role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
