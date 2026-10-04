const theatreController = require('../controller/theatre.controller');
const theatreMiddleware = require('../middlewares/theatre.middleware');
const authMiddleWare = require('../middlewares/auth.middleware');
const routes = (app) =>{
    app.post('/mba/api/v1/theatres',theatreMiddleware.validateTheatreCreateRequest, theatreController.create);
    app.get('/mba/api/v1/theatres', theatreController.getAllTheatre);
    app.get('/mba/api/v1/theatres/:id', theatreController.getTheatre);
    app.delete('/mba/api/v1/theatres/:id',authMiddleWare.isAuthenticated, theatreController.deleteTheatre);
    app.patch('/mba/api/v1/theatres/:id/movies',theatreMiddleware.validateUpdateMovie, theatreController.updateMovies);
    app.get('/mba/api/v1/theatres/:id/movies', theatreController.getMoviesInATheatre);
    app.get('/mba/api/v1/theatres/:theatreId/movies/:movieId', theatreController.checkMovie);

}

module.exports = routes;