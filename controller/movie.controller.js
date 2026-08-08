const Movie = require('../models/movie.model');


/*
    Controller function to create a new movie in the database.
    @param req: {name, description, casts, trailerUrl, language, releaseDate, director, releaseStatus}
    @param res: JSON response with success status and created movie data.

*/
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
            sucess:true,
            message: 'Successfully deleted the movie.'
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            sucess: false,
            message: 'Error in deleting the movie',
            error:err
        });
    }
}
const getMovie = async(req, res) =>{
    try{
        const movie = await Movie.findById(req.params.id);
        return res.status(200).json({
            sucess: true,
            message:'Sucessfully fetched the movie details',
            data:movie
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            sucess:false,
            error: err,
            message: 'Error in searching the movie'
        })
    }
}

module.exports = {
    createMovie,deleteMovie,getMovie
}


