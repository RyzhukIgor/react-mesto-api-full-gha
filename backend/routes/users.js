const routerUsers = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const patternValid = require('../utils/patternValid');

const {
  getUsers, getUserId, updateUser, updateAvatar, getInfoUser,
} = require('../controllers/users');

routerUsers.get('/', getUsers);
routerUsers.get('/me', getInfoUser);
routerUsers.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUserId);
routerUsers.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);
routerUsers.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(patternValid).required(),
  }),
}), updateAvatar);

module.exports = routerUsers;
