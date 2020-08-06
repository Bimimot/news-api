/* eslint-disable max-len */
/* eslint-disable max-classes-per-file */
class BadFormatError extends Error { // данные переданы в неверном формате
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class AuthError extends Error { // ошибка авторизации
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class AccessDeniedError extends Error { // ошибка авторизации
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class NotFoundError extends Error { // ресурс не найден
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class DoubleDataError extends Error { // ресурс не найден
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

class ServerError extends Error { // ресурс не найден
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = {
  BadFormatError, AuthError, AccessDeniedError, NotFoundError, DoubleDataError, ServerError,
};
