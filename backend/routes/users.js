const routerUsers = require('express').Router();
const patternValid = require('../utils/patternValid');

const {
  // eslint-disable-next-line comma-dangle
  getUsers, getUserId, updateUser, updateAvatar, getInfoUser
} = require('../controllers/users');
// eslint-disable-next-line import/no-extraneous-dependencies, import/order
const { Joi, celebrate, errors } = require('celebrate');

routerUsers.get('/', getUsers);
routerUsers.get('/me', getInfoUser);
routerUsers.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUserId);
routerUsers.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
routerUsers.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(patternValid),
  }),
}), updateAvatar);

routerUsers.use(errors());
module.exports = routerUsers;
