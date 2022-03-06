const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const messages = require('../errors/errors-mesage');

const { NODE_ENV, JWT_SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(messages.unauthorizedError);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_KEY : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError(messages.unauthorizedError);
  }

  req.user = payload;

  next();
};
