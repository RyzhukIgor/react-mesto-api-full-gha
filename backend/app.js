require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Connected');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestLogger);
app.use(routes);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (statusCode === 500) {
    res.status(500).send({ message: 'Внутренняя ошибка сервере' });
    next();
  } else {
    res.status(statusCode).send({ message: err.message });
    next();
  }
});
app.listen(PORT, () => {
  console.log(`Listing on port ${PORT}`);
});
