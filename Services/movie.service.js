const Movie = require('../models/movie.model');
const getMovie = async (id) =>{
    try{
        const movie = await Movie.findById(id);
        if(!movie){
            return {
                err:'No Movie found for this corresponding id',
                code:404
            }
        };
        return movie;
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {
    getMovie
}