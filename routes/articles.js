const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate'); // подключаем библиотеку для валидации запросов

// const auth = require('../middlewares/auth'); // подключаем мидлвэру авторизации
// const validUrl = require('./valid'); // подключаем функцию проверки url

const { getArticles, postArticle, deleteArticle } = require('../controllers/users'); // импорт методов из контроллера

// router.use(auth); // вызываем авторизацию для всех методов идущих ниже
router.get('/', getArticles); // вызываем метод получения всех статей пользователя
router.post('/', postArticle); // вызываем метод добавления статьи
router.delete('/:Id', deleteArticle); // вызываем метод удаления статьи

module.exports = router;
