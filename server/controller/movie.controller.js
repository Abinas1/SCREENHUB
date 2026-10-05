

const MovieServices = require('../Services/movie.service');
const {errorResponseBody, successResponseBody} = require('../utils/responsebody');
const {USER_ROLE, STATUS} = require('../utils/constraints');
/*
    Controller function to create a new movie in the database.
    @param req: {name, description, casts, trailerUrl, language, releaseDate, director, releaseStatus}
    @param res: JSON response with success status and created movie data.

*/


const createMovie = async (req, res) =>{
    try{
        const response = await MovieServices.createMovie(req.body);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully Created the Movie";
        return res.status(STATUS.CREATED).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            errorResponseBody.message = "Validation failed on few parameters of the request body"
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const deleteMovie = async(req, res) => {
    try{
        const response = await MovieServices.deleteMovie(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully deleted the Movie";
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        console.log(error);
        if(error.code){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}
const getMovie = async(req, res) =>{
    try{
        
        const response = await MovieServices.getMovie(req.params.id);
        successResponseBody.data = response;
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        if(error.code){
            errorResponseBody.err=error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}
const updateMovie = async (req, res) =>{
    try{
        
        const response = await MovieServices.updateMovie(req.params.id, req.body);
        successResponseBody.data = response;
        //console.log(response);
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorresponseBody.err=error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}
const getMoviesByName = async (req, res) =>{
    try{
        const response = await MovieServices.fetchMovies(req.query);
        successResponseBody.data = response;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(successResponseBody);
    }
    catch(error){
        if(error.code){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports = {
    createMovie,deleteMovie,getMovie, updateMovie, getMoviesByName
}


