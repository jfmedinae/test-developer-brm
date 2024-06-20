const express = require('express');
const passport = require('passport');

const PurchaseService = require('../services/purchase.service');
const { checkAdminRole, checkRoles } = require('./../middlewares/auth.handler');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getPurchaseSchema,
  createPurchaseSchema,
  addItemSchema,
} = require('../schemas/purchase.schema');

const router = express.Router();
const service = new PurchaseService();

/**
 * @api {get} /purchases/record Get products record of the user logged in
 * @apiGroup Purchases
 * @apiSuccess {Array} object array with the products bought
 */
router.get(
  '/record',
  passport.authenticate('jwt', {session: false}),
  checkRoles('Cliente'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const purchase = await service.findRecordProductsByUser(user.id);
      res.json(purchase);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @api {get} /purchases/:id Get all information of the one purchase of the user logged in
 * @apiGroup Purchases
 * @apiParam {Number} id   Mandatory id of the purchase.
 * @apiSuccess {Object} All information of the purchase
 */
router.get(
  '/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('Cliente'),
  validatorHandler(getPurchaseSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = req.user;
      const purchase = await service.findOneByUser(id, user);
      res.json(purchase);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @api {get} /purchases Get the information of all purchases of the all users
 * @apiGroup Purchases
 * @apiSuccess {Array} All information of all purchases
 */
router.get(
  '/',
  passport.authenticate('jwt', {session: false}),
  checkAdminRole,
  async (req, res, next) => {
    try {
      const purchase = await service.find();
      res.json(purchase);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @api {post} /purchases Create header of the one purchase
 * @apiGroup Purchases
 * @apiBody {Date} name   Mandatory date of purchase creation .
 * @apiSuccess {Object} Purchase header info saved on the DB
 */
router.post(
  '/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('Cliente'),
  validatorHandler(createPurchaseSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = req.user;
      const newPurchase = await service.create(body, user);
      res.status(201).json(newPurchase);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @api {post} /purchases/add-items Add products to one purchase
 * @apiGroup Purchases
 * @apiBody {Array}   Object array with properties userId, productId and amount.
 * @apiSuccess {Array} Object array with the info items saved on the DB
 */
router.post(
  '/add-items',
  passport.authenticate('jwt', {session: false}),
  checkRoles('Cliente'),
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = req.user;
      const newItem = await service.addItems(body, user);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
