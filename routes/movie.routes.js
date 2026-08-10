const MovieController = require('../controller/movie.controller');

const MovieMiddlewares = require('../middlewares/movie.middlewares');

const routes = (app) =>{
    app.post('/mba/api/v1/movies',MovieMiddlewares.validateMovieCreateRequest, MovieController.createMovie);
    app.delete('/mba/api/v1/movies/:id', MovieController.deleteMovie);
    app.get('/mba/api/v1/movies/:id', MovieController.getMovie); 
    app.put('/mba/api/v1/movies/:id',MovieController.updateMovie);
    app.patch('/mba/api/v1/movies/:id',MovieController.updateMovie);
    app.get('/mba/api/v1/movies',MovieController.getMoviesByName)
}

module.exports = routes;