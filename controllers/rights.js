const bcrypt = require('bcryptjs'); // импорт модуля для создания хешей
const jwt = require('jsonwebtoken'); // импорт модуля для создания токенов
const User = require('../models/user'); // импорт схемы
const { cryptoKey } = require('../helpers/key'); // импорт ключа для зашифровки токена

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
    
    .catch(next);
};

// авторизация пользователя

module.exports.signIn = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id, name: user.name }, cryptoKey, { expiresIn: '7d' }); // создали токен со сроком действия 7 дней
      // res.cookie('JWT', token, { maxAge: 604800000, domain: '', httpOnly: true, /*SameSite: 'Lax'*/ });
      res.send({ message: 'Пользователь авторизован', status: 200, token: token });
    })
    .catch(next);
};
