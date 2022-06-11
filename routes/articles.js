const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');
const validUrl = require('../helpers/valid');
const { getArticles, postArticle, deleteArticle } = require('../controllers/articles');

router.use(auth); // use auth for all methdos below

router.get('/', getArticles); // get all user's article

router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().min(2).required(),
    title: Joi.string().min(2).required(),
    text: Joi.string().min(2).required(),
    date: Joi.date().iso().required(),
    source: Joi.string().min(2).required(),
    link: Joi.string().custom((value) => validUrl(value)).required(),
    image: Joi.string().custom((value) => validUrl(value)).required(),
  }),
}), postArticle); // post new article

router.delete('/:artId',
  celebrate({
    params: Joi.object().keys({ artId: Joi.string().hex().length(24) }),
  }),
  deleteArticle); // del article

module.exports = router;
