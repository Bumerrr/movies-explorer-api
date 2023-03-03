const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized');
const {
  BEARER,
  PRODUCTION,
  DEV_SECRET,
  NOT_AUTH_ERROR,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith(BEARER)) {
    return next(new UnauthorizedError(NOT_AUTH_ERROR));
  }

  const token = authorization.replace(BEARER, '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === PRODUCTION ? JWT_SECRET : DEV_SECRET);
  } catch (err) {
    return next(new UnauthorizedError(NOT_AUTH_ERROR));
  }

  req.user = payload;

  return next();
};
