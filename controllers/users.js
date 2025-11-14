const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config');
const { HTTP_STATUS, ERROR_MESSAGES } = require('../utils/constants');
const ConflictError = require('../utils/errors/ConflictError');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const NotFoundError = require('../utils/errors/NotFoundError');

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      const userResponse = user.toObject();
      delete userResponse.password;
      res.status(HTTP_STATUS.CREATED).json(userResponse);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ token });
    })
    .catch(() => {
      next(new UnauthorizedError(ERROR_MESSAGES.INVALID_CREDENTIALS));
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND);
      }
      res.json(user);
    })
    .catch(next);
};
