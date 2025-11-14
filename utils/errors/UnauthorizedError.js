const AppError = require('./AppError');
const { HTTP_STATUS } = require('../constants');

class UnauthorizedError extends AppError {
  constructor(message) {
    super(HTTP_STATUS.UNAUTHORIZED, message);
  }
}

module.exports = UnauthorizedError;
