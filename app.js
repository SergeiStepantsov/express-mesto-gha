const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { handleErrors } = require('./utilities/handleErrors');
const { PORT } = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

// подключаем мидлвары, роуты и всё остальное...
app.use(router);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  handleErrors(err, res);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
