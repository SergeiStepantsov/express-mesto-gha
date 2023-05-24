const routerUsers = require('express').Router();

const {
  getUser,
  getAllUsers,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const {
  validateUserData,
  validateUserAvatar,
  validateUserId,
} = require('../utilities/userValidate');

routerUsers.get('/', getAllUsers);
routerUsers.get('/me', getCurrentUser);
routerUsers.get('/:userId', validateUserId, getUser);
routerUsers.patch('/me', validateUserData, updateUser);
routerUsers.patch('/me/avatar', validateUserAvatar, updateAvatar);

module.exports = routerUsers;
