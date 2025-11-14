const router = require('express').Router();
const auth = require('../middlewares/auth');
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const articlesRoutes = require('./articles');
const NotFoundError = require('../utils/errors/NotFoundError');

// Rotas pÃºblicas
router.use('/', authRoutes);

// Rotas protegidas
router.use('/users', auth, usersRoutes);
router.use('/articles', auth, articlesRoutes);

// Rota nÃ£o encontrada
// Rota não encontrada (Express 5): middleware final sem path
router.use((req, res, next) => {
  next(new NotFoundError('Rota não encontrada'));
});

module.exports = router;
