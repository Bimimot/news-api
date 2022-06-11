/* eslint-disable consistent-return */

const jwt = require('jsonwebtoken'); // for making jwt-token
const { cryptoKey } = require('../helpers/key'); // key for dev-mode
const { AuthError } = require('../helpers/errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) { // if no auth header or token isn't Bearer show err
    throw new AuthError('Authorization is needed');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, cryptoKey); // make payload from token
  } catch (err) {
    next(new AuthError('Authorization is needed'));
  }

  req.user = payload; // add payload to request

  next(); // send request further
};
