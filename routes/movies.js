const moviesRouter = require('express').Router();

const {
  createMovie,
  getMovies,
  deleteMovieById,
} = require('../controllers/movies');

moviesRouter.get('/movies', getMovies);
moviesRouter.post('/movies', createMovie);
moviesRouter.delete('/movies/:id', deleteMovieById);

module.exports = moviesRouter;
