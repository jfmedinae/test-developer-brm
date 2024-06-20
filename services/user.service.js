const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {}

  async findByEmail(email) {
    const response = await models.User.findOne({
      where: { email }
    });
    return response;
  }
  
  async create(data) {
    const hash = await bcrypt.hash(data.password, 5);
    const newUser = await models.User.create({
      ...data,
      password: hash
    });
    delete newUser.dataValues.password;
    delete newUser.dataValues.recoveryToken;
    return newUser;
  }
}

module.exports = UserService;
