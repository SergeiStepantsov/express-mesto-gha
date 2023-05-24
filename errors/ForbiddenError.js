const httpConstants = require('http2').constants;

class ForbiddenError extends Error {
  constructor(message = 'Ошибка доступа') {
    super(message);
    this.statusCode = httpConstants.HTTP_STATUS_FORBIDDEN; // 403
  }
}
module.exports = {
  ForbiddenError,
};
