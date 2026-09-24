const {errorResponseBody} = require('../utils/responsebody');
const ValidateAuthReq = async (req, res, next) => {
    if(!req.body.name){
        errorResponseBody.message = "Name of the user is not provided.";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.email){
        errorResponseBody.message = "Email of the user is not provided.";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.password){
        errorResponseBody.message = "Passwword of the user is not provided.";
        return res.status(400).json(errorResponseBody);
    }
    next();
} 

module.exports = {
    ValidateAuthReq
}