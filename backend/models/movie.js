const mongoose = require('mongoose');
const validator = require('validator');
const messages = require('../errors/errors-mesage');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        validator.isURL(v);
      },
      message: messages.url,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        validator.isURL(v);
      },
      message: messages.url,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        validator.isURL(v);
      },
      message: messages.url,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    require: true,
    minlength: 1,
    maxlength: 100,
  },
  nameEN: {
    type: String,
    require: true,
    minlength: 1,
    maxlength: 100,
  },
});

module.exports = mongoose.model('movie', movieSchema);
