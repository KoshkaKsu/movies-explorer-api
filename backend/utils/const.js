const {
  DB = 'mongodb://localhost:27017/moviesdb',
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET_KEY,
} = process.env;

module.exports = {
  DB, PORT, JWT_SECRET_KEY, NODE_ENV,
};
