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

module.exports.getMovies = (req, res, next) => {
  const movieId = req.user._id;
  Movie.findById(movieId)
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
    .then((card) => res.status(CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Нет карточки с таким id');
      }

      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нет прав на удаление карточки');
      }

      movie.remove()
        .then(() => {
          res.send({ message: 'Карточка успешно удалена' });
        })
        .catch(next);
    })
    .catch(next);
};

// module.exports.deleteMovieById = (req, res, next) => {
//   const { movieId } = req.params;
//   Movie.findById(movieId)
//     .populate(['likes', 'owner'])
//     .orFail(() => {
//       throw new NotFoundError('Карточка не найдена');
//     })
//     .then((movie) => {
//       if (!movie.owner._id.equals(req.user._id)) {
//         return next(new ForbiddenError('Вы не можете удалить чужую карточку'));
//       }
//       return movie.remove()
//         .then(() => {
//           res.send({ message: 'Карточка удалена' });
//         })
//         .catch(next);
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         res.send({ message: movieId.owner._id });
//         return next(new BadRequestError('Передан некорретный Id'));
//       }
//       return next(err);
//     });
// };
