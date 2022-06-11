/* eslint max-classes-per-file: ["error", 6] */

class BadFormatError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class AccessDeniedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class DoubleDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = {
  BadFormatError, AuthError, AccessDeniedError, NotFoundError, DoubleDataError, ServerError,
};
