const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');

const {
  VALIDATION_ERROR,
  CONFLICT_ERROR_EMAIL,
  BAD_REQUEST,
  PRODUCTION,
  DEV_SECRET,
} = require('../utils/constants');

const {
  BadRequestError,
  ConflictError,
} = require('../errors');

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      })
        .then(() => res.status(201).send({
          data: {
            name, email,
          },
        }))
        .catch((err) => {
          if (err.code === 11000) {
            return next(new ConflictError(CONFLICT_ERROR_EMAIL));
          }
          if (err.name === VALIDATION_ERROR) {
            return next(new BadRequestError(BAD_REQUEST));
          }
          return next(err);
        });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === PRODUCTION ? JWT_SECRET : DEV_SECRET, {
        expiresIn: '7d',
      });
      res.status(200).send({ token });
    })
    .catch(next);
};
