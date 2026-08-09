const Movie = require('../models/movie.model');

const MovieServices = require('../Services/movie.service');
/*
    Controller function to create a new movie in the database.
    @param req: {name, description, casts, trailerUrl, language, releaseDate, director, releaseStatus}
    @param res: JSON response with success status and created movie data.

*/
const errorResponseBody = {
    err:{},
    data:{},
    message:'Error in searching the movie',
    success: false
}
const successResponseBody = {
    err:{},
    data:{},
    message:'successfully fetched the movie details',
    success:true
}

const createMovie = async (req, res) =>{
    try{
        const movie = await Movie.create(req.body);
        return res.status(201).json({
            success: true,
            message: 'Movie created successfully',
            data: movie
        });
    }
    catch(error){
        console.error('Error creating movie:', error);
        return res.status(500).json({
            success: false,
            message: 'Error creating movie',
            error: err
        });
    }
}

const deleteMovie = async(req, res) => {
    try{
        const response = await Movie.deleteOne({
            _id:req.params.id
        });
        return res.status(200).json({
            success:true,
            message: 'Successfully deleted the movie.'
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Error in deleting the movie',
            error:err
        });
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

module.exports = {
    createMovie,deleteMovie,getMovie
}


