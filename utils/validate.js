const { BadRequestError } = require('../errors');
const { BAD_REQUEST, SCHEMA_VALIDATE_MESSAGES_URL } = require('./constants');

function validateUrl(url) {
  const test = /^https?:\/\/(www\.)?[a-zA-Z\d]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/g;
  if (test.test(url)) {
    return url;
  }
  throw new Error(SCHEMA_VALIDATE_MESSAGES_URL);
}

const validationId = (id) => {
  if (/^[0-9a-fA-F]{24}$/.test(id)) {
    return id;
  }
  throw new BadRequestError(BAD_REQUEST);
};

module.exports = { validateUrl, validationId };
