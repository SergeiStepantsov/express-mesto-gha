const express = require("express");
const router = require("express").Router();
const { login, createUser } = require("../controllers/users");
const {
  validateLogin,
  validateRegister,
} = require("../utilities/userValidate");
const auth = require("../middlewares/auth");
const usersRouter = require("./users");
const cardsRouter = require("./cards");
const { handleErrors, NotFoundError } = require("../utilities/handleErrors");

router.post("/signin", validateLogin, login);
router.post("/signup", validateRegister, createUser);
router.use(auth);
router.use("/users", usersRouter);
router.use("/cards", cardsRouter);
router.use("*", (req, res) => {
  const newError = new NotFoundError(
    "По указанному вами адресу ничего не найдено"
  );
  handleErrors(newError, res);
});

module.exports = router;
