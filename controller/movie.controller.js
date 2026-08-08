const Movie = require('../models/movie.model');


/*
    Controller function to create a new movie in the database.
    @param req: {name, description, casts, trailerUrl, language, releaseDate, director, releaseStatus}
    @param res: JSON response with success status and created movie data.

*/
const createMovie = async (req, res) =>{
    try{
        console.log("REQ BODY:", req.body);
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
            message: 'Error creating movie'
        });
    }
}
module.exports = {
    createMovie
}