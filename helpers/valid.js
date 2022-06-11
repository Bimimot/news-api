const validatorNpm = require('validator');
const { BadFormatError } = require('./errors');

module.exports = (value) => {
  if (!validatorNpm.isURL(value)) {
    throw new BadFormatError('Sorry, but it`s a wrong url');
  } else { return value; }
};
