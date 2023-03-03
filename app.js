const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimit');
const auth = require('./middlewares/auth');
const indexRouter = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const { NotFoundError } = require('./errors');

const { PORT } = process.env;
const { MONGO_URL, GOOD, NOT_FOUND_ERROR } = require('./utils/constants');

const app = express();
app.use(cors());
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URL);
app.use(express.json());
app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(indexRouter);
app.use('*', auth, (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ERROR));
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(PORT, GOOD);
});
