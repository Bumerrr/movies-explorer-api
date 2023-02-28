const authRouter = require('express').Router();

const {
  validationSignUp,
  validationSignIn,
} = require('../middlewares/joi');

const {
  createUser, login,
} = require('../controllers/auth');

authRouter.post('/signup', validationSignUp, createUser);

authRouter.post('/signin', validationSignIn, login);

module.exports = authRouter;
