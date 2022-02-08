/**
 * Подключение роутов — чтобы в app.js импортировался единый роут
 */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRoutes = require('./users');
const moviesRoutes = require('./movies');
const auth = require('../middlewares/auth');

const { createUser, loginUser } = require('../controllers/users');

const NotFoundError = require('../errors/not-found-error');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), loginUser);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

router.use('/', auth, userRoutes, moviesRoutes);

router.all('/*', () => {
  throw new NotFoundError('Страница не найдена!');
});

module.exports = router;
