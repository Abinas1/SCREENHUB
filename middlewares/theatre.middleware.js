
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

module.exports  ={validateTheatreCreateRequest}