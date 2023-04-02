// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const Card = require('../models/card');
const ErrorNotFound = require('../utils/ErrorNotFound');
const ErrBadRequest = require('../utils/ErrBadRequest');
const ForBiddenErr = require('../utils/ErrBadRequest');

const {
  STATUS_CREATED,
  STATUS_OK,
} = require('../utils/errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch((error) => next(error));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((newCard) => res.status(STATUS_CREATED).send(newCard))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ErrBadRequest('Переданы некорректные данные'));
      } else {
        next(error);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { userId } = req.user._id;
  Card.findById(cardId)
    .orFail(() => {
      throw new ErrorNotFound('Пользователь не найден');
    })
    .then((card) => {
      const ownerId = card.owner.id;
      if (ownerId !== userId) {
        next(new ForBiddenErr('У вас нет доступа к удалению этой карточки'));
      } else {
        card.remove();
        res.send({ data: card });
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ErrBadRequest('Переданы некорректные данные'));
      } else {
        next(error);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .orFail(() => {
      throw new ErrorNotFound('Пользователь не найден');
    })
    .then((card) => res.status(STATUS_OK).send(card))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ErrBadRequest('Переданы некорректные данные'));
      } else {
        next(error);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .orFail(() => {
      throw new ErrorNotFound('Пользователь не найден');
    })
    .then((card) => res.status(200).send(card))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ErrBadRequest('Переданы некорректные данные'));
      } else {
        next(error);
      }
    });
};
