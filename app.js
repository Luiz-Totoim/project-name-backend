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
const defaultOrigins = ['http://localhost:3000', 'https://luiz-totoim.github.io'];
const envOrigins = (process.env.CORS_ORIGINS || process.env.CORS_ORIGIN || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const allowedOrigins = [...new Set([...defaultOrigins, ...envOrigins])];

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};


// Conectar ao MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch((err) => console.error('❌ Erro ao conectar ao MongoDB:', err));

// Middlewares de segurança
app.use(helmet());
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

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
