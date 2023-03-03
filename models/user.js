const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { UnauthorizedError } = require('../errors');
const { SCHEMA_VALIDATE_MESSAGES_EMAIL, NOT_AUTH_ERROR_WRONG_EMAIL_OR_PASSWORD } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: SCHEMA_VALIDATE_MESSAGES_EMAIL,
    },
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(NOT_AUTH_ERROR_WRONG_EMAIL_OR_PASSWORD));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(NOT_AUTH_ERROR_WRONG_EMAIL_OR_PASSWORD));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
