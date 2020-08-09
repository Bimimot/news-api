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

// eslint-disable-next-line no-unused-vars
const { NotFoundError, ServerError, BadFormatError } = require('./helpers/errors'); // импорт конструкторов типовых ошибок
const articlesRouter = require('./routes/articles.js'); // импортируем роутер для карточек
const usersRouter = require('./routes/users.js'); // импортируем роутер для данных о пользователях
const signsRouter = require('./routes/signs.js'); // импортируем роутер для получения прав пользователей - регистрация, авторизация

// const { requestLogger, errorLogger } = require('./middlewares/logger'); // подключаем мидлваоу логгирования

app.use(bodyParser.json()); // подключаем сборку JSON-формата
// app.use(requestLogger); // подключаем логирование запросов

app.use('/users', usersRouter); // подключаем usersRouter
app.use('/articles', articlesRouter); // подключаем usersRouter
app.use('/', signsRouter); // подключаем rightsRouter

app.use((req, res, next) => { // генерируем ошибку если запрос на несуществующую страницу
  next(new NotFoundError('Такой ресурс не найден'));
});

// app.use(errorLogger); // подключаем логирование ошибок

// обработка ошибок, сюда переходим из блоков catch
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
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
});

app.listen(PORT); // начинаем слушать заданный порт