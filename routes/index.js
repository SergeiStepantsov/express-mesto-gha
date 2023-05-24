const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const {
  validateLogin,
  validateRegister,
} = require('../utilities/userValidate');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { NotFoundError } = require('../utilities/handleErrors');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, createUser);
router.use(auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('По указанному вами адресу ничего не найдено'));
});

module.exports = router;
