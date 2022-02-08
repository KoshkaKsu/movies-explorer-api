const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const UnauthorizedError = require('../errors/unauthorized-err');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');

const { NODE_ENV, JWT_SECRET_KEY } = process.env;

const getUsers = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь с таким id не найден!'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некоректный запрос!'));
      } else next(err);
    });
};

function updateProfile(req, res, next) {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true, upsert: false },
  )
    .orFail(new NotFoundError('Пользователь с таким id не найден!'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некоректные данные при обновления профиля!'));
      } else {
        next(err);
      }
    });
}

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => User.create({
    name, email, password: hash,
  }).then((user) => {
    res.status(200).send({
      name: user.name,
      email: user.email,
      password: hash,
    });
  })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некоректные данные для создания пользователя!'));
      } else if (err.name === 'MongoError' && err.code === 11000) { //  случай, когда пользователь пытается зарегистрироваться по уже существующему в базе email
        next(new ConflictError('Такой пользователь уже зарегистрирован!'));
      } else next(err);
    }));
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      throw new UnauthorizedError('Неверная почта или пароль!');
    }
    return bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new UnauthorizedError('Неверная почта или пароль!');
        }
        return user;
      });
  }).then((user) => {
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET_KEY : 'dev-secret',
      { expiresIn: '7d' },
    );
    res.send({ token });
  })
    .catch((err) => {
      next(new UnauthorizedError(`Произошла ошибка: ${err.message}`));
    });
};

module.exports = {
  getUsers,
  updateProfile,
  createUser,
  loginUser,
};
