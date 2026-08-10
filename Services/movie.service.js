const Movie = require('../models/movie.model');
const createMovie = async (data) =>{
    try{
        const movie = await Movie.create(data);
        return movie;
    }
    catch(error){
        if(error.name == "ValidationError"){
            let err = {};
            Object.keys(error.errors).forEach((key) =>{
                err[key] = error.errors[key].message;
            });
            return {err: err, code:422};
        }
        throw error;
    }
}
const deleteMovie = async(id) =>{
    const response = await Movie.findByIdAndDelete(id);
    return response;
}

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

const updateMovie = async (id, data) =>{
    try{
        const movie = await Movie.findByIdAndUpdate(id, data, {new:true, runValidators:true});
        return movie;
    }
    catch(error){
        if(error.name = "ValidationError"){
            let err = {};
            Object.keys(error.errors).forEach((key) =>{
                err[key] = error.errors[key].message;
            });
            return {err: err, code:422};
        }
        console.log(error);
        throw error;
    }
}
module.exports = {
    getMovie,
    createMovie,
    deleteMovie,
    updateMovie
}