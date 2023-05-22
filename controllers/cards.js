const Card = require("../models/cards");
const httpConstants = require("http2").constants;
const {
  handleErrors,
  NotFoundError,
  ForbiddenError,
} = require("../utilities/handleErrors");

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => card.populate("owner"))
    .then((card) => res.status(httpConstants.HTTP_STATUS_CREATED).send(card))
    .catch(next);
};

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .populate([
      { path: "likes", model: "user" },
      { path: "owner", model: "user" },
    ])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.removeCard = (req, res, next) => {
  Card.findOne({ _id: req.params.cardId })
    .populate([{ path: "owner", model: "user" }])
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточка уже удалена");
      }
      if (card.owner._id.toString() !== req.user._id.toString()) {
        throw new ForbiddenError("У вас нет прав на удаление этой карточки");
      }
      return card.deleteOne().then((deletedCard) => {
        res.send(deletedCard);
      });
    })
    .catch(next);
};

const updateLikes = (req, res, action) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { [action]: { likes: req.user._id } },
    { new: true }
  )
    .populate([
      { path: "likes", model: "user" },
      { path: "owner", model: "user" },
    ])
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        throw new NotFoundError("Карточка не найдена");
      }
    })
    .catch((err) => handleErrors(err, res));
};

module.exports.addLike = (req, res) => {
  updateLikes(req, res, "$addToSet");
};

module.exports.removeLike = (req, res) => {
  updateLikes(req, res, "$pull");
};
