
const {errorResponseBody} = require('../utils/responsebody')
const validateTheatreCreateRequest  = async (req, res, next) =>{
    if(!req.body.name){
        errorResponseBody.message = "The name of the theatre is not present";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.city){
        errorResponseBody.message = "The city of the theatre is not present";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.address){
        errorResponseBody.message = "The address of the theatre is not present";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.pincode){
        errorResponseBody.message = "The pincode of the theatre is not present";
        return res.status(400).json(errorResponseBody);
    }
    next();
}
const validateUpdateMovie = async (req, res, next) =>{
    console.log(req);
    if(req.body.insert == undefined){
        errorResponseBody.message = "The insert parameter is missing in the request";
        return res.status(400).json(errorResponseBody);
    }

    //validate movie ids present
    if(!req.body.movieIds){
        errorResponseBody.message = "No movies present in the request to be updated in the theatre";
        return res.status(400).json(errorResponseBody);
    }
    //validate movie id present or not
    if(!(req.body.movieIds instanceof Array)){
        errorResponseBody.message = "Exepected array of movies but foiund something else";
        return res.status(400).json(errorResponseBody);
    }
    //validate movie present or not
    if(req.body.movieIds.length == 0){
        errorResponseBody.message = "No movie found in the array";
        return res.status(400).json(errorResponseBody);
    }

    next();
}

module.exports  ={validateTheatreCreateRequest, validateUpdateMovie}