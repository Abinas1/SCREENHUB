const {errorResponseBody} = require('../utils/responsebody');
const ValidateSignupRequest = async (req, res, next) => {
    if(!req.body.name){
        errorResponseBody.err = "Name of the user is not provided.";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.email){
        errorResponseBody.err = "Email of the user is not provided.";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.password){
        errorResponseBody.err = "Passwword of the user is not provided.";
        return res.status(400).json(errorResponseBody);
    }
    next();
} 

const ValidateSigninRequest = async (req, res, next) => {
    if(!req.body.email){
        errorResponseBody.err = "Emailis not provided in sign in process.";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.password){
        errorResponseBody.err = "Password is not provided in sign in process.";
        return res.status(400).json(errorResponseBody);
    }
    next();
}

module.exports = {
    ValidateSignupRequest, ValidateSigninRequest
}