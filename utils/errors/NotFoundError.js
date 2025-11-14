const AppError = require('./AppError');
const { HTTP_STATUS } = require('../constants');

class NotFoundError extends AppError {
  constructor(message) {
    super(HTTP_STATUS.NOT_FOUND, message);
  }
}

module.exports = NotFoundError;
