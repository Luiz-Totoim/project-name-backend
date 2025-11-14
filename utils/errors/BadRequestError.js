const AppError = require('./AppError');
const { HTTP_STATUS } = require('../constants');

class BadRequestError extends AppError {
  constructor(message) {
    super(HTTP_STATUS.BAD_REQUEST, message);
  }
}

module.exports = BadRequestError;
