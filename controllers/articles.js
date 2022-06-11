const Article = require('../models/article'); // import scheme
const { NotFoundError, AccessDeniedError } = require('../helpers/errors');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      if (articles == null) {
        throw new NotFoundError('No articles'); // make Err & go to errHandler
      } else {
        res.send({ message: 'Articles were finded', data: articles });
      }
    })
    .catch(next);
};

module.exports.postArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user; // id from auth-middleware, which use in request
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => {
      res.send({ message: 'Success! The article was created', data: article });
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  const { artId } = req.params;
  const userId = `${req.user._id}`;
  Article.findById(artId).select('+owner')
    .then((article) => {
      if (article == null) {
        throw new NotFoundError('No card with this ID'); // make Err & go to errHandler
      } else {
        const artOwner = `${article.owner}`; // fix type for linter
        if (userId === artOwner) {
          Article.findByIdAndRemove(artId)
            .then((myArticle) => res.send({ message: 'Success! The article was deleted', data: myArticle }))
            .catch(next);
        } else {
          throw new AccessDeniedError('No rights to delete this article');
        }
      }
    })
    .catch(next);
};
