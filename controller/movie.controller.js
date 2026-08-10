

const MovieServices = require('../Services/movie.service');
const {errorResponseBody, successResponseBody} = require('../utils/responsebody');
/*
    Controller function to create a new movie in the database.
    @param req: {name, description, casts, trailerUrl, language, releaseDate, director, releaseStatus}
    @param res: JSON response with success status and created movie data.

*/


const createMovie = async (req, res) =>{
    try{
        const response = await MovieServices.createMovie(req.body);
        //console.log(response);
        if(response.err){
            
            errorResponseBody.err = response.err;
            errorResponseBody.message = "Validation failed on few parameters of the request body"
            return res.status(response.code).json(errorResponseBody);
        }

        successResponseBody.data = response;
        successResponseBody.message = "Successfully Created the Movie";
        return res.status(201).json(successResponseBody);
    }
    catch(error){
        console.error('Error creating movie:', error);
        return res.status(500).json(errorResponseBody);
    }
}

const deleteMovie = async(req, res) => {
    try{
        const response = await MovieServices.deleteMovie(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully deleted the Movie";
        return res.status(200).json(successResponseBody);
    }
    catch(err){
        console.log(err);
        return res.status(500).json(errorResponseBody);
    }
}
const getMovie = async(req, res) =>{
    try{
        
        const response = await MovieServices.getMovie(req.params.id);

        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        return res.status(200).json(successResponseBody);
    }
    catch(err){
        return res.status(500).json(errorResponseBody);
    }
}
const updateMovie = async (req, res) =>{
    try{
        
        const response = await MovieServices.updateMovie(req.params.id, req.body);
        
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        //console.log(response);
        return res.status(200).json(successResponseBody);
    }
    catch(err){
        errorResponseBody.err = err;
        return res.status(500).json(errorResponseBody);
    }
}
const getMoviesByName = async (req, res) =>{
    try{
        const response = await MovieServices.fetchMovies(req.query);
        console.log(response);
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        else{
            successResponseBody.data = response;
            return res.status(500).json(successResponseBody);
        }
    }
    catch(err){
        errorResponseBody.err = err;
        return res.status(500).json(errorResponseBody);
    }
}

module.exports = {
    createMovie,deleteMovie,getMovie, updateMovie, getMoviesByName
}


