const express = require('express');

const UserService = require('./../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createUserSchema } = require('./../schemas/user.schema');

const router = express.Router();
const service = new UserService();

/**
 * @api {post} /users Create one user on the DB
 * @apiGroup Users
 * @apiBody {String} name   Mandatory name of the user.
 * @apiBody {String} phone   Mandatory phone of the user.
 * @apiBody {String} address   Mandatory address of the user.
 * @apiBody {String} email   Mandatory email of the user.
 * @apiBody {String} password   Mandatory password of the user.
 * @apiBody {String} role   Mandatory role of the user one of [Administrador, Cliente].
 * @apiSuccess {Object} User info saved on the DB
 */
router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

