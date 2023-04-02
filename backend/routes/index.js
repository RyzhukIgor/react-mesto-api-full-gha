const router = require('express').Router();
const ErrorNotFound = require('../utils/ErrorNotFound');
const auth = require('../middlewares/auth');

const routerUsers = require('./users');
const cardRouter = require('./cards');
const signRouter = require('./auth');

router.use('/', signRouter);
router.use(auth);
router.use('/users', routerUsers);
router.use('/cards', cardRouter);
router.use('*', (req, res, next) => {
  next(new ErrorNotFound('Страница по данному маршруту не найдена'));
});

module.exports = router;
