const usersRouter = require('express').Router();

const {
  getUser,
  updateUser,
} = require('../controllers/users');

const { validationUpdateUserInfo } = require('../middlewares/joi');

usersRouter.get('/users/me', getUser);
usersRouter.patch('/users/me', validationUpdateUserInfo, updateUser);

module.exports = usersRouter;
