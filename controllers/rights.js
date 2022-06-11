const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { cryptoKey } = require('../helpers/key');

module.exports.signUp = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 5)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send(
      {
        message: 'Success! User was created',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    ))

    .catch(next);
};

module.exports.signIn = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id, name: user.name }, cryptoKey, { expiresIn: '7d' }); // make token with 7 days expiration
      // eslint-disable-next-line max-len
      // res.cookie('JWT', token, { maxAge: 604800000, domain: '', httpOnly: true, /*SameSite: 'Lax'*/ });
      res.send({ message: 'Success! User is authorized', status: 200, token });
    })
    .catch(next);
};
