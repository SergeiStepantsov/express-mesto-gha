const httpConstants = require("http2").constants;

class NotFoundError extends Error {
  constructor(message = "Данные не найдены") {
    super(message);
    this.statusCode = httpConstants.HTTP_STATUS_NOT_FOUND; // 404
  }
}
module.exports = {
  NotFoundError,
};
