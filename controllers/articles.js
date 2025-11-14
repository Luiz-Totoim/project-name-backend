const Article = require('../models/article');
const { HTTP_STATUS, ERROR_MESSAGES } = require('../utils/constants');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const BadRequestError = require('../utils/errors/BadRequestError');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.json(articles))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(HTTP_STATUS.CREATED).json(article))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  Article.findById(articleId)
    .then((article) => {
      if (!article) {
        throw new NotFoundError(ERROR_MESSAGES.ARTICLE_NOT_FOUND);
      }

      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError(ERROR_MESSAGES.FORBIDDEN);
      }

      return Article.findByIdAndDelete(articleId);
    })
    .then((article) => res.json(article))
    .catch(next);
};
