const indexRouter = require('express').Router();

const authRouter = require('./auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');

indexRouter.use(authRouter);
indexRouter.use(auth, usersRouter);
indexRouter.use(auth, moviesRouter);

module.exports = indexRouter;
