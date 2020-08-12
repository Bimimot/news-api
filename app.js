require('dotenv').config();
const express = require('express'); // модуль ноды для http сервера
const mongoose = require('mongoose'); // модуль ноды для подключения сервера с базой данных
const bodyParser = require('body-parser'); // модуль ноды для парсинга пост-запросов в нужный (json) формат

const { NODE_ENV } = process.env;
const app = express();
const { PORT = 3000 } = process.env;

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/news', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { NotFoundError, ServerError, BadFormatError } = require('./helpers/errors'); // импорт конструкторов типовых ошибок
const routes = require('./routes/index.js'); // подключаем роутеры
const { requestLogger, errorLogger } = require('./middlewares/logger'); // подключаем мидлваоу логгирования

app.use(bodyParser.json()); // подключаем сборку JSON-формата
app.use(requestLogger); // подключаем логирование запросов

app.use('/api', routes);

app.use((req, res, next) => { // генерируем ошибку если запрос на несуществующую страницу
  next(new NotFoundError('Такой ресурс не найден'));
});

app.use(errorLogger); // подключаем логирование ошибок

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

// обработка ошибок, сюда переходим из блоков catch
app.use((err, req, res, next) => {
  errhandler(err, res); // подключаем функцию централизованной обработки ошибок
  next();
});

app.listen(PORT); // начинаем слушать заданный порт
