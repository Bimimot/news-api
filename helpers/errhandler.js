const { ServerError, BadFormatError, DoubleDataError } = require('./errors'); // импорт конструкторов типовых ошибок

const { NODE_ENV } = process.env;

function errhandler(e, res) {
  let err = e;
  if (err.joi
    || err.name === 'CastError'
    || err.name === 'ValidationError'
    || (err.name === 'MongoError' && err.code !== 11000)) {
    err = new BadFormatError(
      (NODE_ENV !== 'production') ? err : 'В запросе указаны неправильные данные', // для режима разработки возвращаем полный текст ошибки
    );
  }

  if (err.code === 11000) { err = new DoubleDataError('Пользователь с таким email уже существует'); }

  if (!err.statusCode) {
    err = new ServerError(
      (NODE_ENV !== 'production') ? err : 'На сервере произошла ошибка', // для режима разработки возвращаем полный текст ошибки
    );
  }
  return res.status(err.statusCode).send({ message: err.message, status: err.statusCode });
}

module.exports = errhandler;
