// const bcrypt = require('bcryptjs'); // импорт модуля для создания хешей
// const jwt = require('jsonwebtoken'); // импорт модуля для создания токенов
const User = require('../models/user'); // импорт схемы
// const { cryptoKey } = require('../key'); // импорт ключа для зашифровки токена
// const { NotFoundError, DoubleDataError } = require('../middlewares/errors');

// поиск всех пользователей
module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user == null) {
        throw new NotFoundError('Пользователь не найден'); // создаем ошибку и переходим в обработчик ошибок
      } else {
        res.send({ message: 'Пользователь найден', data: user });
      }
    })
    .catch(next);
};
