const MovieController = require('../controller/movie.controller');


const routes = (app) =>{
    app.post('/mba/api/v1/movies', MovieController.createMovie);
}

module.exports = routes;