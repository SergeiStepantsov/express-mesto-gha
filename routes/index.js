const express = require("express");

const router = require("express").Router();

const usersRouter = require("./users");
const cardsRouter = require("./cards");

router.use(express.urlencoded({ extended: true }));
router.use("/users", usersRouter);
router.use("/cards", cardsRouter);
router.use("*", (req, res) => {
  res.status(404).send({ message: "Not Found" });
});
router.use(express.json());

module.exports = router;