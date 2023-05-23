const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { URL_REGEXP } = require("../utilities/constants");
const { AuthorisationError } = require("../errors/AuthorisationError");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Жак-Ив Кусто",
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: "Исследователь",
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    validate: {
      validator: (url) => URL_REGEXP.test(url),
      message: ({ value }) => `${value} - URL указан не корректно`,
    },
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: ({ value }) =>
        `${value} не является действительным адресом электронной почты!`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select("+password");
  if (!user) {
    throw new AuthorisationError("Неправильные почта или пароль");
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new AuthorisationError("Неправильные почта или пароль");
  }
  return user;
};

module.exports = mongoose.model("user", userSchema);
