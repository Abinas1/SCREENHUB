const theatreService = require('../Services/theatre.service');
const {successResponseBody, errorResponseBody} = require('../utils/responsebody');

const create = async (req, res) =>{
    try{
        const response =await theatreService.createTheatre(req.body);
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message  ="Validation failed";
            res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully created the movie";
        return res.status(201).json(successResponseBody);
    }
    catch(error){
        console.log(error);
        errorResponseBody.err = error;

        return res.status(500).json(errorResponseBody);
    }
}

const getTheatre = async (req, res) =>{
    try{
        const response = await theatreService.getTheatre(req.params.id);

        console.log(response);
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message = "";
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetch the data of the theatre";
        return res.status(200).json(successResponseBody);
    }
    catch(error){
        console.log(error);
        errorResponseBody.err  = error;
        return res.status(500).json(errorResponseBody);
    }
}

const getAllTheatre = async (req, res)=>{
    try{
        const response = await theatreService.getAllTheatre(req.query);
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message = "";
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetch all the movies";
        return res.status(200).json(successResponseBody);
    }
    catch(error){
        //console.log(error);
        errorResponseBody.err = error.err;

        return res.status(500).json(errorResponseBody);
    }
}

const deleteTheatre = async (req, res) =>{
    try{
        const response = await theatreService.deleteTheatre(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Sucessfully deleted the theatre";
        return res.status(200).json(successResponseBody);
    }
    catch(error){
        errorResponseBody.err = error.err;
        console.log(error);
        return res.status(500).json(errorResponseBody);
    }
}

const updateMovies = async (req, res) => {
    try{
        const response = await theatreService.updateMoviesInTheatre(req.params.id, req.body.movieIds, req.body.insert);
        if(response.err){
            errorResponseBody.err =response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully updated the movies in the theatre";
        return res.status(200).json(successResponseBody);
    }
    catch(err){
        console.log(err);
        errorResponseBody.err = err;
        return res.status(500).json(errResponseBody);
    }
}
module.exports = {
    create, getTheatre, getAllTheatre, deleteTheatre, updateMovies
}