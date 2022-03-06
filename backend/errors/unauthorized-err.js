// 401 — передан неверный логин или пароль.
class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
