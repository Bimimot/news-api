const { ServerError, BadFormatError } = require('./errors'); // импорт конструкторов типовых ошибок

const { NODE_ENV } = process.env;

function errhandler(err, res) {
  if (err.joi || (err.name === 'CastError')
    || (err.name === 'ValidationError')
    || (err.name === 'MongoError')) {
    err = new BadFormatError( // eslint-disable-line no-param-reassign
      (NODE_ENV !== 'production') ? err : 'В запросе указаны неправильные данные', // для режима разработки возвращаем полный текст ошибки
    );
  }

  if (!err.statusCode) {
    err = new ServerError( // eslint-disable-line no-param-reassign
      (NODE_ENV !== 'production') ? err : 'На сервере произошла ошибка', // для режима разработки возвращаем полный текст ошибки
    );
  }
  return res.status(err.statusCode).send({ message: err.message, status: err.statusCode });
}

module.exports = errhandler;
