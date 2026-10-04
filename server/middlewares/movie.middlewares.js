const badRequestResponse = {
    success:false,
    err: "",
    data:{},
    message:"Malformed Request | Bad Resuest"
};
const validateMovieCreateRequest = async (req, res, next) =>{
    //validate the movie name
    if(!req.body.name){
        badRequestResponse.err = "The name of the movie is not provided";
        return res.status(400).json({badRequestResponse});
    }
    //validate the movie description
    if(!req.body.description){
        badRequestResponse.err = "The description of the movie is not provided";
        return res.status(400).json({badRequestResponse});
    }
    if(!req.body.casts || !(req.body.casts instanceof Array) || req.body.casts.length == 0){
        badRequestResponse.err = "The cast of the movie is not provided";
        
        return res.status(400).json({badRequestResponse});
    }
    //validate the movie director
    if(!req.body.director){
        badRequestResponse.err = "The director of the movie is not provided";
        return res.status(400).json({badRequestResponse});
    }
    //validate the movie Release Date
    if(!req.body.releaseDate){
        badRequestResponse.err = "The Release date of the movie is not provided";
        return res.status(400).json({badRequestResponse});
    }
    //validate the movie trailerUrl
    if(!req.body.trailerUrl){
        badRequestResponse.err = "The trailerUrl of the movie is not provided";
        return res.status(400).json({badRequestResponse});
    }
    
    next();
}


module.exports = {
    validateMovieCreateRequest
}