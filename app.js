require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { PORT, MONGO_URL } = require('./config');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/rateLimiter');

const app = express();

// Conectar ao MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch((err) => console.error('❌ Erro ao conectar ao MongoDB:', err));

// Middlewares de segurança
app.use(helmet());
app.use(cors());
app.options('*', cors());

// Rate limiting
app.use(limiter);

// Body parser
app.use(express.json());

// Request logger
app.use(requestLogger);

// Rotas
app.use('/api', routes);

// Error logger
app.use(errorLogger);

// Error handlers
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
