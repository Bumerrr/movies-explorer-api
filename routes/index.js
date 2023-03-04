const indexRouter = require('express').Router();

const authRouter = require('./auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/not-found-error');
const { NOT_FOUND_ERROR } = require('../utils/constants');
const auth = require('../middlewares/auth');

indexRouter.use(authRouter);
indexRouter.use(auth, usersRouter);
indexRouter.use(auth, moviesRouter);

indexRouter.use('*', auth, (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ERROR));
});

module.exports = indexRouter;
