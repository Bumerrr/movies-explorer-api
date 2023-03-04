const Movie = require('../models/movie');
const {
  OK,
  CREATED,
} = require('../utils/constants');

const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require('../errors');

const {
  NOT_FOUND_MOVIE_ERROR,
  VALIDATION_ERROR,
  OK_DELETE_MOVIE,
  FORBIDDEN_DELETE_MOVIE,
  BAD_REQUEST,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movie) => {
      res.status(OK).send(movie);
    })
    .catch((err) => {
      res.send(err);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId,
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
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(CREATED).send({ data: card }))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        return next(new BadRequestError(BAD_REQUEST));
      }
      return next(err);
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND_MOVIE_ERROR);
      }

      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(FORBIDDEN_DELETE_MOVIE);
      }

      movie.remove()
        .then(() => {
          res.send({ message: OK_DELETE_MOVIE });
        })
        .catch(next);
    })
    .catch(next);
};
