const User = require('../models/user');
const { OK } = require('../utils/constants');

const { BadRequestError, NotFoundError, ConflictError } = require('../errors');

const {
  VALIDATION_ERROR,
  CONFLICT_ERROR_EMAIL,
  BAD_REQUEST,
  NOT_FOUND_USER_ERROR,
} = require('../utils/constants');

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
    .orFail(() => { next(new NotFoundError(NOT_FOUND_USER_ERROR)); })
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(CONFLICT_ERROR_EMAIL));
      }
      if (err.name === VALIDATION_ERROR) {
        return next(new BadRequestError(BAD_REQUEST));
      }
      return next(err);
    });
};
