const httpConstants = require('http2').constants;

class AuthorisationError extends Error {
  constructor(message = 'Авторизация не удалась') {
    super(message);
    this.statusCode = httpConstants.HTTP_STATUS_UNAUTHORIZED; // 401
  }
}
module.exports = {
  AuthorisationError,
};
