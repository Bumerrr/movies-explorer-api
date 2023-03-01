const User = require('../models/user');
const { OK } = require('../utils/constants');

const { BadRequestError, NotFoundError } = require('../errors');

module.exports.getUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((err) => {
      res.send(err);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(() => { next(new NotFoundError('Пользователь по указанному _id не найден.')); })
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Введены некорретные данные'));
      }
      return next(err);
    });
};
