const Card = require("../models/cards");
const httpConstants = require("http2").constants;

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).send({
          message: "Переданы некорректные данные при создании карточки.",
        });
      } else {
        res
          .status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: err.message });
      }
    });
};

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) =>
      res
        .status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: err.message })
    );
};

module.exports.removeCard = (req, res) => {
  Card.findByIdAndDelete({ _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        return res
          .status(httpConstants.HTTP_STATUS_NOT_FOUND)
          .send({ message: "Передан несуществующий _id карточки" });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).send({
          message: "Карточка с указанным _id не найдена.",
        });
      } else {
        res
          .status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: err.message });
      }
    });
};

module.exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res
          .status(httpConstants.HTTP_STATUS_NOT_FOUND)
          .send({ message: "Передан несуществующий _id карточки" });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).send({
          message: "Переданы некорректные данные для постановки лайка",
        });
      }
      return res
        .status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: "Ошибка по умолчанию" });
    });
};

module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res
          .status(httpConstants.HTTP_STATUS_NOT_FOUND)
          .send({ message: "Передан несуществующий _id карточки" });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).send({
          message: "Переданы некорректные данные для снятия лайка",
        });
      }
      return res
        .status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: "Ошибка по умолчанию" });
    });
};
