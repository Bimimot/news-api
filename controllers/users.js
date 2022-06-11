const User = require('../models/user');
const { NotFoundError } = require('../helpers/errors');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user == null) {
        throw new NotFoundError('No user'); // make Err & go to errHandler
      } else {
        res.send({ message: 'Success! User was finded', data: user });
      }
    })
    .catch(next);
};
