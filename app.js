const express = require("express");
const mongoose = require("mongoose");
const routerUsers = require("./routes/users");
const routerCards = require("./routes/cards");
const { PORT = 3000 } = process.env;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "645a51c0ce292ea953172dac", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use("/users", routerUsers);
app.use("/cards", routerCards);
// подключаемся к серверу mongo
mongoose.connect("mongodb://localhost:27017/mestodb");
// {
//useNewUrlParser: true,
//useCreateIndex: true,
//useFindAndModify: false,
//});

// подключаем мидлвары, роуты и всё остальное...

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
