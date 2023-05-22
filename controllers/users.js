const User = require("../models/users");
const httpConstants = require("http2").constants;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../config");
const { NotFoundError } = require("../utilities/handleErrors");

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById({ _id })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError("Пользователь не найден");
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;
  bcrypt.hash(password, 10).then((hash) =>
    User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    })
      .then(() =>
        res.status(httpConstants.HTTP_STATUS_CREATED).send({
          name,
          about,
          avatar,
          email,
        })
      )
      .catch(next)
  );
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res
        .cookie("token", token, {
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7дней
          sameSite: true,
          httpOnly: true,
        })
        .send({ token });
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError("Пользователь не найден");
      }
    })
    .catch(next);
};

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError("Пользователь не найден");
      }
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError("Пользователь не найден");
      }
    })
    .catch(next);
};
