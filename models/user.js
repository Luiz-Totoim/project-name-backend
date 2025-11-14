const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email é obrigatório'],
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Email inválido',
      },
    },
    password: {
      type: String,
      required: [true, 'Senha é obrigatória'],
      select: false,
    },
    name: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      minlength: [2, 'Nome deve ter no mínimo 2 caracteres'],
      maxlength: [30, 'Nome deve ter no máximo 30 caracteres'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Email ou senha incorretos'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Email ou senha incorretos'));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
