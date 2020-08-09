const router = require('express').Router();
const { celebrate, Joi } = require('celebrate'); // подключаем библиотеку для валидации запросов

const { signUp, signIn } = require('../controllers/rights'); // импорт методов из контроллера

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), signUp); // вызываем метод регистрации пользователя

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
}), signIn); // вызываем метод авторизации пользователя

module.exports = router;
