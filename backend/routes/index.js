const router = require('express').Router();
const userRoutes = require('./users');
const moviesRoutes = require('./movies');
const auth = require('../middlewares/auth');
const messages = require('../errors/errors-mesage');

const { createUser, loginUser } = require('../controllers/users');
const { signupValidate, signinValidate } = require('../middlewares/validate');
const NotFoundError = require('../errors/not-found-error');

router.post('/signin', signinValidate, loginUser);

router.post('/signup', signupValidate, createUser);

router.use('/', auth, userRoutes, moviesRoutes);

router.all('/*', () => {
  throw new NotFoundError(messages.notFoundError);
});

module.exports = router;
