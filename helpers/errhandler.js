const { ServerError, BadFormatError, DoubleDataError } = require('./errors'); // import err constructors

const { NODE_ENV } = process.env;

function errhandler(e, res) {
  let err = e;
  if (err.joi
    || err.name === 'CastError'
    || err.name === 'ValidationError'
    || (err.name === 'MongoError' && err.code !== 11000)) {
    err = new BadFormatError(
      (NODE_ENV !== 'production') ? err : 'Request data is not valid', // for dev-mode return full error
    );
  }

  if (err.code === 11000) { err = new DoubleDataError('Sorry, we have user with the same e-mail'); }

  if (!err.statusCode) {
    err = new ServerError(
      (NODE_ENV !== 'production') ? err : 'Sorry, we have an server error', // for dev-mode return full error
    );
  }
  return res.status(err.statusCode).send({ message: err.message, status: err.statusCode });
}

module.exports = errhandler;
