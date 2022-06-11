require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoose = require('mongoose'); // for MONGO use
const bodyParser = require('body-parser');

const app = express();
const { PORT = 3000 } = process.env;

// connect to MONGO-server
mongoose.connect('mongodb://localhost:27017/news', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { NotFoundError } = require('./helpers/errors');
const errhandler = require('./helpers/errhandler');
const routes = require('./routes/index.js');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = rateLimit({
  windowMs: 60000, // 1min
  max: 30, // max 30 requests per 1min
});

const whitelist = [
  'http://localhost:8080',
  'https://bimimot.github.io',
  'https://bimimot.github.io/',
  'https://bimimot.github.io/news-frontend/',
]; // cors list

const corsOptions = {
  origin(origin, callback) {
    if ((whitelist.indexOf(origin) !== -1) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(limiter); // DDoS defender
app.use(helmet()); // headers for privacy
app.use(bodyParser.json()); // JSON-parser

app.use(requestLogger); // add logger

app.use('/api-news/', routes); // add routes

app.use((req, res, next) => { // 404 err
  next(new NotFoundError('Sorry, but URL is wrong'));
});

app.use(errorLogger);

// add errHandler, it works after catch blocks
app.use((err, req, res, next) => {
  errhandler(err, res); // middleware for errs
  next();
});

app.listen(PORT); // start listen our port
