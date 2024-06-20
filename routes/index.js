const express = require('express');

const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const purchaseRouter = require('./purchase.router');
const authRouter = require('./auth.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/purchases', purchaseRouter);
  router.use('/auth', authRouter);
}

module.exports = routerApi;
