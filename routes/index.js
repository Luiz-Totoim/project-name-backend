const router = require('express').Router();
const auth = require('../middlewares/auth');
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const articlesRoutes = require('./articles');
const NotFoundError = require('../utils/errors/NotFoundError');

// Rotas públicas
router.use('/', authRoutes);

// Rotas protegidas
router.use('/users', auth, usersRoutes);
router.use('/articles', auth, articlesRoutes);

// Rota não encontrada
router.use('*', () => {
  throw new NotFoundError('Rota não encontrada');
});

module.exports = router;
