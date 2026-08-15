const Theatre = require('../models/theatre.model');

const Movie = require('../models/movie.model');


/*
@param data ->object containing details of new theatre
@returns -> return the new theatre object
*/
const createTheatre = async (data) =>{
    try{
        const response = await Theatre.create(data);
        return response;
    }
    catch(error){
        console.log(error);
        if(error.name == 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key) =>{
                err[key] = error.errors[key].message;
            });
            return {err:err, code:422};
        }
        throw err; 
    }
    
}

const getTheatre = async (id) =>{
    try{
        const response = await Theatre.findById(id);
        console.log(id);
        if(!response){
            return {
                err:"No theatre found for the id",
                code: 404
            }
        }
        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

const getAllTheatre = async (data)=>{
    try{
        let query = {};
        let pagination = {};
        pagination.limit = 2;
        //city is present in query params or not
        if(data && data.city){
            query.city = data.city;
        }
        //pincode is present in query params or not
        if(data && data.pincode){
            query.pincode = data.pincode;
        }
        //name is present in query params or not

        if(data && data.name){
            query.name = data.name;
        }

        if(data && data.movieId){
            //movie object
            let movie = await Movie.findById(data.movieId);
            if(!movie){
                throw {err:"Movie does not exists",
                    code : 404 
                }
            }
            query.movies = data.movieId;
        }

        if(data && data.limit){
            pagination.limit = data.limit;
        }
        
        if(data && data.page){
            pagination.skip = data.page * pagination.limit;
        }
        const response = await Theatre.find(query, {}, pagination);
        
        if(!response || response.length == 0){
            return {err: "No theatre exists in the database",
                code:404
            }
        }
        return response;
    }
    catch(error){
        console.log(error);
        throw error
    }
}
const deleteTheatre = async (id) =>{
    try{
        
        const response = await Theatre.findByIdAndDelete(id);

        if(!response){
            throw {
                err: "No theatre exists for the corresponding id.",
                code: 404
            }
        }
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

const updateMoviesInTheatre = async (theatreId, movieIds, insert) => {
    try{
        const theatre = await Theatre.findById(theatreId);
        
        if(!theatre || theatre.length == 0){
            return {
                err: "No Such theatre found for the id provided.",
                code: 404
            };
        }
        if(insert){
            let previousMovies = new Set(theatre.movies.map(movieId => movieId.toString()));
            console.log(previousMovies);
            movieIds.forEach(movieId =>{
                if(!previousMovies.has(movieId)){
                    theatre.movies.push(movieId);
                }
                
            });
        }
        else{
            theatre.movies = theatre.movies.filter(
            savedMovieId =>
                !movieIds.some(
                    movieId =>
                        savedMovieId.toString() === movieId.toString()
                )
        )}
         console.log("Before save:", theatre.movies);
        await theatre.save();
        console.log("After save:", theatre.movies);
        return theatre.populate('movies');
    }
    catch(err){
        throw  err;
    }
}

module.exports = {
    createTheatre, 
    getTheatre, 
    getAllTheatre, 
    deleteTheatre, 
    updateMoviesInTheatre
}