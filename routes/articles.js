const router = require('express').Router();
const { celebrate, Joi } = require('celebrate'); // подключаем библиотеку для валидации запросов

const auth = require('../middlewares/auth'); // подключаем мидлвэру авторизации
const validUrl = require('../helpers/valid'); // подключаем функцию проверки url
const { getArticles, postArticle, deleteArticle } = require('../controllers/articles'); // импорт методов из контроллера

router.use(auth); // вызываем авторизацию для всех методов идущих ниже

router.get('/', getArticles); // вызываем метод получения всех статей пользователя

router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().min(2).required(),
    title: Joi.string().min(2).required(),
    text: Joi.string().min(2).required(),
    date: Joi.date().iso().required(),
    source: Joi.string().min(2).required(),
    link: Joi.string().custom((value) => validUrl(value)).required(),
    image: Joi.string().custom((value) => validUrl(value)).required(),
  }),
}), postArticle); // вызываем метод добавления статьи

router.delete('/:artId', celebrate({
  params: Joi.object().keys({ artdId: Joi.string().hex().length(24) }),
}), deleteArticle); // вызываем метод удаления статьи

module.exports = router;
