const AppError = require('./AppError');
const { HTTP_STATUS } = require('../constants');

class ForbiddenError extends AppError {
  constructor(message) {
    super(HTTP_STATUS.FORBIDDEN, message);
  }
}

module.exports = ForbiddenError;
