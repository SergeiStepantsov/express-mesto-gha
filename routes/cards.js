const routerCards = require('express').Router();

const {
  getAllCards,
  createCard,
  removeCard,
  addLike,
  removeLike,
} = require('../controllers/cards');

const {
  validateCardData,
  validateCardById,
} = require('../utilities/cardValidate');

routerCards.get('/', getAllCards);
routerCards.post('/', validateCardData, createCard);
routerCards.delete('/:cardId', validateCardById, removeCard);
routerCards.put('/:cardId/likes', validateCardById, addLike);
routerCards.delete('/:cardId/likes', validateCardById, removeLike);

module.exports = routerCards;
