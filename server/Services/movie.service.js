const Movie = require('../models/movie.model');
const {STATUS} = require('../utils/constraints');
/*
@param data ->object containing details of new movie
@returns -> return the new movie object
*/

const createMovie = async (data) => {
    try {
        const movie = await Movie.create(data);
        return movie;
    }
    catch (error) {
        if (error.name == "ValidationError") {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            throw { err: err, code: STATUS.UNPROCESSABLE_ENTITY };
        }
        throw error;
    }
}
const deleteMovie = async (id) => {

    try {
        const response = await Movie.findByIdAndDelete(id);
        if(!response){
            throw {err:"Movie not found", code:STATUS.NOT_FOUND};
        }
        return response;
    }
    catch(error){
        throw error;
    }
}

const getMovie = async (id) => {
    try {
        const movie = await Movie.findById(id);
        if (!movie) {
            throw {
                err: 'No Movie found for this corresponding id',
                code: STATUS.NOT_FOUND
            }
        };
        return movie;
    }
    catch (error) {
        throw error;
    }
}

const updateMovie = async (id, data) => {
    try {
        const movie = await Movie.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        return movie;
    }
    catch (error) {
        if (error.name = "ValidationError") {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            throw { err: err, code: STATUS.UNPROCESSABLE_ENTITY };
        }
        console.log(error);
        throw error;
    }
}

const fetchMovies = async (filter) => {
    try {
        let query = {}
        if (filter.name) {
            query.name = filter.name;
        }
        let movies = await Movie.find(query);
        if (!movies) {
            throw {
                err: 'Not able to find the queries movies',
                code: STATUS.NOT_FOUND
            };
        }
        return movies;
    }
    catch (error) {
        throw error;
    }
}
module.exports = {
    getMovie,
    createMovie,
    deleteMovie,
    updateMovie,
    fetchMovies
}