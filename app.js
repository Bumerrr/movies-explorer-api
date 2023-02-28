const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimit');
const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const authRouter = require('./routes/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { NotFoundError } = require('./errors');

const { PORT, MONGO_URL } = process.env;
const app = express();
app.use(cors());

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URL);
app.use(express.json());
app.use(limiter);
app.use(helmet());
app.use(requestLogger);
app.use(authRouter);
app.use('/users', auth, usersRouter);
app.use('/movies', auth, moviesRouter);
app.use(errorLogger);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Адреса по вашему запросу не существует'));
});

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(PORT, 'Все работает');
});
