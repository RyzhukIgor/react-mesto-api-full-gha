const router = require('express').Router();
const ErrorNotFound = require('../utils/ErrorNotFound');

const routerUsers = require('./users');
const cardRouter = require('./cards');

router.use('/users', routerUsers);
router.use('/cards', cardRouter);
router.use('*', (req, res, next) => {
  next(new ErrorNotFound('Страница по данному маршруту не найдена'));
});

module.exports = router;
