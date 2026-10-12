const {STATUS} = require('../utils/constraints');
const {errorResponseBody} = require('../utils/responsebody');
const ObjectId = require('mongoose').Types.ObjectId;
const theatreService = require('../Services/theatre.service');
const movieService = require('../Services/movie.service');

const validateBookingCreaterequest = async(req, res, next) =>{
    if(!req.body.theatreId){
        errorResponseBody.message = "Theatre id is not provided.";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    if(!ObjectId.isValid(req.body.theatreId)){
        errorResponseBody.message = "Invalid theatre id provided.";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    const theatre = await theatreService.getTheatre(req.body.theatreId);
    if(!theatre){
        errorResponseBody.message = "No theatre found for the given id.";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }
    if(!req.body.movieId){
        errorResponseBody.message = "Movie id is not provided.";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    if(!ObjectId.isValid(req.body.movieId)){
        errorResponseBody.message = "Invalid movie id provided.";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    const movie = await movieService.getMovie(req.body.movieId);
    if(!movie){
        errorResponseBody.message = "No movie found for the given id.";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }
    if(!theatre.movies.includes(req.body.movieId)){
        errorResponseBody.message = "Movie is not exist in the theatre.";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }
    if(!req.body.noOfSeats){
        errorResponseBody.message = "No of seats is not provided";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }
    //console.log(req.body.timing);
    if(!req.body.timing){
        errorResponseBody.message = "Timing is not provided";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }
    next();
}

module.exports = {validateBookingCreaterequest}