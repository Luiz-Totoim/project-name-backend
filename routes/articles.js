const router = require('express').Router();
const { validateArticle, validateArticleId } = require('../middlewares/validation');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

router.get('/', getArticles);
router.post('/', validateArticle, createArticle);
router.delete('/:articleId', validateArticleId, deleteArticle);

module.exports = router;
