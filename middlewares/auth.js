const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { AuthorisationError } = require("../errors/AuthorisationError");

module.exports = (req, res, next) => {
  const token = req.cookies.token; // || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(new AuthorisationError("Необходима авторизация"));
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (err) {
    return next(new AuthorisationError("Необходима авторизация"));
  }
};
