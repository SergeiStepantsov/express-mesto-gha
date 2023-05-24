const httpConstants = require('http2').constants;

class ConflictError extends Error {
  constructor(message = 'Пользователь с данным email уже существует') {
    super(message);
    this.statusCode = httpConstants.HTTP_STATUS_CONFLICT; // 409
  }
}
module.exports = {
  ConflictError,
};
