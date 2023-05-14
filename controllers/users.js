const User = require("../models/users");
const httpConstants = require("http2").constants;

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).send({
          message: "Переданы некорректные данные при создании пользователя.",
        });
      } else {
        res
          .status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: err.message });
      }
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error("NotFound"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(httpConstants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: "Переданы некорректные данные" });
      }
      if (err.message === "NotFound") {
        return res
          .status(httpConstants.HTTP_STATUS_NOT_FOUND)
          .send({ message: "Пользователь по указанному _id не найден" });
      }
      return res
        .status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: "Ошибка по умолчанию" });
    });
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) =>
      res
        .status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: err.message })
    );
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).send({
          message: "Переданы некорректные данные при обновлении профиля.",
        });
      }
      return res
        .status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: "Ошибка по умолчанию" });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).send({
          message: "Переданы некорректные данные при обновлении профиля.",
        });
      } else {
        res
          .status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: err.message });
      }
    });
};
