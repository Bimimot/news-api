const mongoose = require('mongoose');
const validatorNpm = require('validator');
// const bcrypt = require('bcryptjs'); // импорт модуля для создания хешей
// const { AuthError } = require('../middlewares/errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validator(text) {
      return (validatorNpm.isEmail(text));
    },
    message: (props) => `${props.value} Неверно указана электронная почта`,
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

// userSchema.statics.findUserByCredentials = function checkUser(email, password) {
//   return this.findOne({ email }).select('+password') // при вызове метода указываем, что в объект необходимо добавить  пароль для обработки и получения токена
//     .then((user) => {
//       if (!user) {
//         return Promise.reject(new AuthError('Неправильные почта или пароль'));
//       }

//       return bcrypt.compare(password, user.password) // сравнение хэшей

//         .then((matched) => {
//           if (!matched) {
//             return Promise.reject(new AuthError('Неправильные почта или пароль'));
//           }
//           return user; // возвращаем объект user для использования в контроллерах
//         });
//     });
// };

module.exports = mongoose.model('user', userSchema);
