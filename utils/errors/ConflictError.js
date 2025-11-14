const AppError = require('./AppError');
const { HTTP_STATUS } = require('../constants');

class ConflictError extends AppError {
  constructor(message) {
    super(HTTP_STATUS.CONFLICT, message);
  }
}

module.exports = ConflictError;
