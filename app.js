const express = require("express");
const mongoose = require("mongoose");
//const routerUsers = require("./routes/users");
//const routerCards = require("./routes/cards");
const router = require("./routes/index");
const { PORT = 3000 } = process.env;

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: "645a51c0ce292ea953172dac", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

// подключаемся к серверу mongo
mongoose.connect("mongodb://localhost:27017/mestodb");

// подключаем мидлвары, роуты и всё остальное...

// app.use(express.json());
// app.use("/users", routerUsers);
// app.use("/cards", routerCards);
// app.use("*", (req, res) => {
//   res.status(404).send({ message: "Not Found" });
// });
app.use(router);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
