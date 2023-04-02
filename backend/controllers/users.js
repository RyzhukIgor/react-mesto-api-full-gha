/* eslint-disable import/order */
require('dotenv').config();
const User = require('../models/user');
const ErrorNotFound = require('../utils/ErrorNotFound');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const ConflictUserErr = require('../utils/ConflictUserErr');
const ErrBadRequest = require('../utils/ErrBadRequest');

const { JWT_SECRET = 'dev-secret' } = process.env;

const {
  STATUS_CREATED,
  STATUS_OK,
} = require('../utils/errors');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserId = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      throw new ErrorNotFound('Пользователь не найден');
    })
    .then((user) => {
      res.status(STATUS_OK).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ErrBadRequest('Переданы некорректные данные'));
      } else {
        next(error);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then(() => res.status(STATUS_CREATED).send({ message: 'Пользователь создан' }))
    .catch((error) => {
      if (error.code === 11000) {
        next(new ConflictUserErr('Аккаунт с данным email зарегистрирован'));
      } else if (error.name === 'ValidationError') {
        next(new ErrBadRequest('Переданы некорректные данные'));
      } else {
        next(error);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new ErrorNotFound('Пользователь не найден');
    })
    .then((user) => res.status(STATUS_OK).send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ErrBadRequest('Переданы некорректные данные'));
      } else {
        next(error);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new ErrorNotFound('Пользователь не найден');
    })
    .then((user) => res.status(STATUS_OK).send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ErrBadRequest('Переданы некорректные данные'));
      } else {
        next(error);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.getInfoUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(() => {
      throw new ErrorNotFound('Пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ErrBadRequest('Переданы некорректные данные'));
      } else {
        next(error);
      }
    });
};
