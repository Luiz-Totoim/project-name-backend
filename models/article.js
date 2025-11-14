const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Palavra-chave é obrigatória'],
  },
  title: {
    type: String,
    required: [true, 'Título é obrigatório'],
  },
  text: {
    type: String,
    required: [true, 'Texto é obrigatório'],
  },
  date: {
    type: String,
    required: [true, 'Data é obrigatória'],
  },
  source: {
    type: String,
    required: [true, 'Fonte é obrigatória'],
  },
  link: {
    type: String,
    required: [true, 'Link é obrigatório'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Link inválido',
    },
  },
  image: {
    type: String,
    required: [true, 'Imagem é obrigatória'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'URL de imagem inválida',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model('article', articleSchema);
