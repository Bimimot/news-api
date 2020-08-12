const router = require('express').Router();

const articlesRouter = require('./articles.js'); // импортируем роутер для карточек
const usersRouter = require('./users.js'); // импортируем роутер для данных о пользователях
const signsRouter = require('./signs.js'); // импортируем роутер для получения прав пользователей - регистрация, авторизация

router.use('/users', usersRouter); // подключаем usersRouter
router.use('/articles', articlesRouter); // подключаем usersRouter
router.use('/', signsRouter); // подключаем rightsRouter

module.exports = router;
