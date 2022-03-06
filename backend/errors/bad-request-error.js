// 400 — переданы некорректные данные в метод
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
module.exports = BadRequestError;
