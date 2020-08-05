const mongoose = require('mongoose');
const validatorNpm = require('validator');
// const bcrypt = require('bcryptjs'); // импорт модуля для создания хешей
// const { AuthError } = require('../middlewares/errors');

const articleSchema = new mongoose.Schema({
  keyword:{
      type: String;
      required: true;
      minlength: 2
  },
  title:{
    type: String;
    required: true;
    minlength: 2
  },
  text:{
    type: String;
    required: true;
    minlength: 2
  },
  date:{
    type: String;
    required: true;
    minlength: 10
  },
  source:{
    type: String;
    required: true;
    minlength: 2
  },
  link:   {
    type: String,
    required: true;
    validate: {
      validator(text) {
        return (validatorNpm.isURL(text));
      },
      message: (props) => `${props.value} Это неправильная ссылка на статью`,
    },
  },

  image:   {
    type: String,
    required: true;
    validate: {
      validator(text) {
        return (validatorNpm.isURL(text));
      },
      message: (props) => `${props.value} Это неправильная ссылка на фото`,
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId, // свойство из коллекции user
    ref: 'user',
    required: true,
    select: false
  },

});

module.exports = mongoose.model('article', articleSchema);
