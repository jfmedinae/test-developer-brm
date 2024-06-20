const express = require('express');
const passport = require('passport');

const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { checkAdminRole } = require('./../middlewares/auth.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

/**
 * @api {get} /products Get all products on the DB
 * @apiGroup Products
 * @apiSuccess {Array} array of objects with all products
 */
router.get('/',
  passport.authenticate('jwt', {session: false}),
  checkAdminRole,
  async (req, res, next) => {
    try {
      const products = await service.find();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @api {get} /products/:id Get one product for the id
 * @apiGroup Products
 * @apiParam {Number} id   Mandatory id of the product.
 * @apiSuccess {Object}  Product info
 */
router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkAdminRole,
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @api {post} /products Create one product
 * @apiGroup Products
 * @apiBody {String} name   Mandatory name of the Product.
 * @apiBody {String} lotNumber   Mandatory number of lot.
 * @apiBody {Number} price   Mandatory price of the product.
 * @apiBody {Number} amountAvailable   Mandatory amount available of the product.
 * @apiBody {Date} entryDate   Mandatory income date of the product.
 * @apiSuccess {Object} Product info saved on the DB
 */
router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkAdminRole,
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @api {patch} /products/:id Update one product
 * @apiGroup Products
 * @apiParam {Number} id   Mandatory id of the product.
 * @apiBody {String} [name]   Optional name of the product.
 * @apiBody {String} [lotNumber]   Optional number of lot.
 * @apiBody {Number} [price]   Optional price of the product.
 * @apiBody {Number} [amountAvailable]   Optional amount available of the product.
 * @apiBody {Date} [entryDate]   Optional income date of the product.
 * @apiSuccess {Object} Product info saved on the DB
 */
router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkAdminRole,
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @api {delete} /products/:id Delete one product from the DB
 * @apiGroup Products
 * @apiParam {Number} id   Mandatory id of the product.
 * @apiSuccess {Object}  Id product deleted
 */
router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  checkAdminRole,
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
