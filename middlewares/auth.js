/* eslint-disable consistent-return */
// отключен запрет линтера на отсутствие return в стрелочной функции

const jwt = require('jsonwebtoken'); // подключаем модуль создания jwt токенов
const { cryptoKey } = require('../helpers/key'); // импорт ключа для зашифровки токена
const { AuthError } = require('../helpers/errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) { // если в заголовке нет авторизации или она начинается не с Bearer - выводим ошибку
    throw new AuthError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', ''); // убираем тип токена из заголовка, чтобы остался чистый токен
      
  
  // const token = req.cookies.jwt;
      
  //     if (!token) {
  //       next(new AuthError('Необходима авторизация'));
  //     }

  let payload;

  try {
    payload = jwt.verify(token, cryptoKey); // расшиифровываем токен ключа, получаем пейлоад
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса (пейлоуд здесь - это id пользоваателя)

  next(); // пропускаем запрос дальше
};
