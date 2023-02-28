const moviesRouter = require('express').Router();

const {
  createMovie,
  getMovies,
  deleteMovieById,
} = require('../controllers/movies');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', createMovie);
moviesRouter.delete('/:id', deleteMovieById);

module.exports = moviesRouter;
