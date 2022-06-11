const router = require('express').Router();
const { celebrate, Joi } = require('celebrate'); // validation requests

const { signUp, signIn } = require('../controllers/rights');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), signUp);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
}), signIn);

module.exports = router;
