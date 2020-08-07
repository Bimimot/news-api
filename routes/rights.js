const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate'); // подключаем библиотеку для валидации запросов

const { signUp, signIn } = require('../controllers/rights'); // импорт методов из контроллера

router.post('/signup', signUp); // вызываем метод регистрации пользователя
router.post('/signin', signIn); // вызываем метод авторизации пользователя

module.exports = router;
