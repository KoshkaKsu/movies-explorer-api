module.exports = (err, req, res, next) => {
  // если возникает ошибка,которую мы не предусмотрели, статус 500
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Error!'
        : message,
    });
  next();
};
