require('dotenv').config();

const {
  NODE_ENV = 'development',
  PORT = 3001,
  MONGO_URL = 'mongodb://localhost:27017/newsexplorer',
  JWT_SECRET = 'dev-secret-key',
} = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  MONGO_URL: NODE_ENV === 'production' ? process.env.MONGO_URL : MONGO_URL,
  JWT_SECRET: NODE_ENV === 'production' ? process.env.JWT_SECRET : JWT_SECRET,
};
