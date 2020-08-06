const Article = require('../models/article'); // импорт схемы
// const { NotFoundError, DoubleDataError } = require('../middlewares/errors');

// поиск всех статей пользователя
module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      if (articles == null) {
        throw new NotFoundError('Статьи не найдены'); // создаем ошибку и переходим в обработчик ошибок
      } else {
        res.send({ message: 'Статьи найдены', data: articles });
      }
    })
    .catch(next);
};

// создание статьи
module.exports.postArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image,
  })
    .then((article) => {
      res.send({ message: 'Статья создана', data: article });
    })
    .catch(next);
};

// удаление статьи по id
module.exports.deleteArticle = (req, res, next) => {
  const { artId } = req.params;
  const userId = `${req.user._id}`;
  Article.findById(artId)
    .then((article) => {
      if (article == null) {
        throw new NotFoundError('Карточка с таким id не найдена'); // создаем ошибку и переходим в обработчик ошибок
      } else {
        const artOwner = `${article.owner}`; // приводим к одному типу для соблюдения стандарта линтера при использовании оператров сравнения
        if (userId === artOwner) {
          Article.findByIdAndRemove(artId)
            .then((myArticle) => res.send({ message: 'Статья удалена', data: myArticle }))
            .catch(next);
        } else {
          throw new AccessDeniedError('Нет прав на удаление этой статьи');
        }
      }
    })
    .catch(next);
};
