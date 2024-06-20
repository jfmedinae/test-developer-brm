const express = require('express');
const passport = require('passport');

const AuthService = require('./../services/auth.service');

const router = express.Router();
const service = new AuthService();

/**
 * @api {post} /auth/login System login
 * @apiGroup Auth
 * @apiBody {String} email   Mandatory email of the User.
 * @apiBody {String} password   Mandatory password of the user.
 * @apiSuccess {Object} user User info
 * @apiSuccess {String} token Token required to access private actions
 */
router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
