const mongoose = require('mongoose');
const validatorNpm = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    minlength: 2,
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
  },
  text: {
    type: String,
    required: true,
    minlength: 2,
  },
  date: {
    type: Date,
    required: true,
  },
  source: {
    type: String,
    required: true,
    minlength: 2,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(text) {
        return (validatorNpm.isURL(text));
      },
      message: (props) => `${props.value} It's the wrong url for an article`,
    },
  },

  image: {
    type: String,
    required: true,
    validate: {
      validator(text) {
        return (validatorNpm.isURL(text));
      },
      message: (props) => `${props.value} It's the wrong url for an foto`,
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId, // property from user
    ref: 'user',
    required: true,
    select: false,
  },

});

module.exports = mongoose.model('article', articleSchema);
