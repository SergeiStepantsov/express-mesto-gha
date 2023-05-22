const mongoose = require("mongoose");
const httpConstants = require("http2").constants;
const { ForbiddenError } = require("../errors/ForbiddenError");
const { NotFoundError } = require("../errors/NotFoundError");
const { AuthorisationError } = require("../errors/AuthorisationError");

const { CastError, ValidationError } = mongoose.Error;

function handleErrors(error, response) {
  if (error.code === 11000) {
    return response
      .status(httpConstants.HTTP_STATUS_CONFLICT) //409
      .send({ message: "Пользователь с данным email уже существует" });
  }
  if (
    error instanceof NotFoundError ||
    error instanceof AuthorisationError ||
    error instanceof ForbiddenError
  ) {
    const { message } = error;
    return response.status(error.statusCode).send({ message });
  }
  if (error instanceof CastError || error instanceof ValidationError) {
    return response
      .status(httpConstants.HTTP_STATUS_BAD_REQUEST) //400
      .send({ message: "Переданы некорректные данные" });
  }
  return response
    .status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR) //500
    .send({ message: "На сервере произошла ошибка" });
}

module.exports = {
  handleErrors,
  NotFoundError,
  AuthorisationError,
  ForbiddenError,
};
