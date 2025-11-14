const { isCelebrateError } = require('celebrate');
const { HTTP_STATUS, ERROR_MESSAGES } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  // Celebrate validation errors
  if (isCelebrateError(err)) {
    const errorBody =
      err.details.get('body') || err.details.get('params') || err.details.get('headers');
    const errorMessage = errorBody?.details[0]?.message || ERROR_MESSAGES.VALIDATION_ERROR;
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: errorMessage });
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: Object.values(err.errors)
        .map((error) => error.message)
        .join(', '),
    });
  }

  // Mongoose CastError (invalid ID)
  if (err.name === 'CastError') {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: ERROR_MESSAGES.INVALID_ID });
  }

  // Duplicate key error (MongoDB)
  if (err.code === 11000) {
    return res.status(HTTP_STATUS.CONFLICT).json({ message: ERROR_MESSAGES.EMAIL_ALREADY_EXISTS });
  }

  // Custom app errors
  const { statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).json({
    message:
      statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR ? ERROR_MESSAGES.INTERNAL_ERROR : message,
  });

  return next();
};
