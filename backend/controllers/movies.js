const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-err');
const messages = require('../errors/errors-mesage');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(messages.badRequestError));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie
    .findById({ _id: req.params.movieId }).select('+owner')
    .orFail(new NotFoundError(messages.notFoundError))
    .then((movie) => {
      if (owner.toString() === movie.owner.toString()) {
        return movie.remove().then(() => res.send({ message: `Фильм "${movie.nameRU}(${movie.nameEN}),${movie.year}" удалён` }));
      }
      throw new ForbiddenError(messages.forbiddenError);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError(messages.badRequestError));
      }
      next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
