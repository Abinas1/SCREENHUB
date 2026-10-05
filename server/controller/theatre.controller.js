const theatreService = require('../Services/theatre.service');
const {successResponseBody, errorResponseBody} = require('../utils/responsebody');
const {STATUS} = require('../utils/constraints');

const create = async (req, res) =>{
    try{
        const response =await theatreService.createTheatre(req.body);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully created the theatre";
        return res.status(STATUS.CREATED).json(successResponseBody);
    }
    catch(error){
        console.log(error);
        errorResponseBody.err = error;
        if(error.err){
            return res.status(error.code).json(errorResponseBody);
        }
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getTheatre = async (req, res) =>{
    try{
        const response = await theatreService.getTheatre(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetch the data of the theatre";
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        console.log(error);
        if(error.err){
            errorResponseBody.err  = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err  = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getAllTheatre = async (req, res)=>{
    try{
        const response = await theatreService.getAllTheatre(req.query);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetch all the movies";
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        //console.log(error);
        if(erorr.err){
            errorResponseBody.err = error.err;
            errorResponseBody.message = "Error in getting all the movies";
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const deleteTheatre = async (req, res) =>{
    try{
        const response = await theatreService.deleteTheatre(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Sucessfully deleted the theatre";
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        console.log(error);
        if(error.err){
            errorResponseBody.err=error.err;
            return res.status(error.code).json(errorresponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const updateMovies = async (req, res) => {
    try{
        const response = await theatreService.updateMoviesInTheatre(req.params.id, req.body.movieIds, req.body.insert);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully updated the movies in the theatre";
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        console.log(error);
        if(error.err){
            errorResponseBody.err =error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getMoviesInATheatre = async (req, res) => {
    try{
        const response = await theatreService.getMoviesInATheatre(req.params.id);
        successResponseBody.message = "Successfully fetch the movies";
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
const checkMovie = async (req, res) =>{
    try{
        const response = await theatreService.checkMovieInATheatre(req.params.theatreId, req.params.movieId);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully checked that a movie is present or not.";
        console.log(successResponseBody);
        return res.status(STATUS.OK).json(successResponseBody);
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
    create, getTheatre, getAllTheatre, deleteTheatre, updateMovies, getMoviesInATheatre, checkMovie
}