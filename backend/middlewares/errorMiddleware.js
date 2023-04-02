module.exports = ((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (statusCode === 500) {
    res.status(500).send({ message: 'Внутренняя ошибка сервере' });
    next();
  } else {
    res.status(statusCode).send({ message: err.message });
    next();
  }
});
