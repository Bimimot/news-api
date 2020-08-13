require('dotenv').config();
const express = require('express'); // модуль ноды для http сервера
const rateLimit = require('express-rate-limit'); // модуль ноды для огранчиения кол-во запросов, защита от DDoS
const helmet = require('helmet'); // модуль ноды для установки заголовков безопасности
const mongoose = require('mongoose'); // модуль ноды для подключения сервера с базой данных
const bodyParser = require('body-parser'); // модуль ноды для парсинга пост-запросов в нужный (json) формат

const app = express();
const { PORT = 3000 } = process.env;

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/news', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { NotFoundError } = require('./helpers/errors'); // импорт конструкторов типовых ошибок
const errhandler = require('./helpers/errhandler'); // импорт централизованного оработчика ошибок
const routes = require('./routes/index.js'); // подключаем роутеры
const { requestLogger, errorLogger } = require('./middlewares/logger'); // подключаем мидлваоу логгирования

const limiter = rateLimit({
  windowMs: 1000, // за 1 секунду
  max: 1, // можно совершить максимум 1 запрос с одного IP
});

app.use(limiter); // подключаем защиту от DDoS
app.use(helmet()); // устанавливаем заголовки безопасности
app.use(bodyParser.json()); // подключаем сборку JSON-формата
app.use(requestLogger); // подключаем логирование запросов

app.use('/', routes);

app.use((req, res, next) => { // генерируем ошибку если запрос на несуществующую страницу
  next(new NotFoundError('Такой ресурс не найден'));
});

app.use(errorLogger); // подключаем логирование ошибок

// обработка ошибок, сюда переходим из блоков catch
app.use((err, req, res, next) => {
  errhandler(err, res); // подключаем функцию централизованной обработки ошибок
  next();
});

app.listen(PORT); // начинаем слушать заданный порт
