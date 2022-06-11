const mongoose = require('mongoose');
const validatorNpm = require('validator');
const bcrypt = require('bcryptjs');
const { AuthError } = require('../helpers/errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validator(text) {
      return (validatorNpm.isEmail(text));
    },
    message: (props) => `${props.value} Email is wrong`,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

});

userSchema.statics.findUserByCredentials = function checkUser(email, password) {
  return this.findOne({ email }).select('+password') // object must have password
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password) // hashs comparing

        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Email or password is wrong'));
          }
          return user; // return user for controllers
        });
    });
};

module.exports = mongoose.model('user', userSchema);
