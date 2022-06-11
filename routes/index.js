const router = require('express').Router();

const articlesRouter = require('./articles.js');
const usersRouter = require('./users.js');
const signsRouter = require('./signs.js');

router.use('/users', usersRouter);
router.use('/articles', articlesRouter);
router.use('/', signsRouter);

module.exports = router;
