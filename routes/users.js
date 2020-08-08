const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate'); // подключаем библиотеку для валидации запросов
const auth = require('../middlewares/auth'); // подключаем мидлвэру авторизации

const { getUser } = require('../controllers/users'); // импорт методов из контроллера

router.use(auth); // вызываем авторизацию
router.get('/me', getUser); // вызываем метод получения данных пользователя

module.exports = router;
