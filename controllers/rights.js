const bcrypt = require('bcryptjs'); // импорт модуля для создания хешей
const jwt = require('jsonwebtoken'); // импорт модуля для создания токенов
const User = require('../models/user'); // импорт схемы
const { cryptoKey } = require('../helpers/key'); // импорт ключа для зашифровки токена
const { DoubleDataError } = require('../helpers/errors');

// создание пользователя
module.exports.signUp = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 5)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send(
      {
        message: 'Пользователь зарегистрирован',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    ))
    .catch((err) => {
      // eslint-disable-next-line no-param-reassign
      if (err.code === 11000) { err = new DoubleDataError('Пользователь с таким email уже существует'); }
      next(err);
    });
};

// авторизация пользователя

module.exports.signIn = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, cryptoKey, { expiresIn: '7d' }); // создали токен со сроком действия 7 дней
      res.cookie('JWT', token, { maxAge: 604800000, httpOnly: true, SameSite: 'Lax' });
      res.send({ message: 'Пользователь авторизован' });
    })
    .catch(next);
};
