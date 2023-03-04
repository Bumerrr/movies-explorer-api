const winston = require('winston');
const expressWinston = require('express-winston');

const { REQUEST_LOG, ERROR_LOG } = require('../utils/constants');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: REQUEST_LOG }),
  ],
  format: winston.format.json(),
});

// логгер ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: ERROR_LOG }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
