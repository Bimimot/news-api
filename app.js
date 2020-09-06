require('dotenv').config();
const express = require('express'); // модуль ноды для http сервера
const cors = require('cors'); // модуль для настройки CORS-правил
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
  windowMs: 1000, // 1 секундa
  max: 5, // можно совершить максимум 2 запроса с одного IP
});

const whitelist = ['http://localhost:8080', 'http://newsfinder.tk', 'https://newsfinder.tk', 'https://bimimot.github.io/News-frontend/' ]; // настройка cors
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(limiter); // подключаем защиту от DDoS
app.use(helmet()); // устанавливаем заголовки безопасности
app.use(bodyParser.json()); // подключаем сборку JSON-формата
app.use(cors(corsOptions));
app.use(requestLogger); // подключаем логирование запросов

app.use('/api', routes); // подключаем api

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
