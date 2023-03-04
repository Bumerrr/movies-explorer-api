const moviesRouter = require('express').Router();

const {
  createMovie,
  getMovies,
  deleteMovieById,
} = require('../controllers/movies');

const {
  validationCreateMovie,
  validationDeleteMovie,
} = require('../middlewares/joi');

moviesRouter.get('/movies', getMovies);
moviesRouter.post('/movies', validationCreateMovie, createMovie);
moviesRouter.delete('/movies/:id', validationDeleteMovie, deleteMovieById);

module.exports = moviesRouter;
