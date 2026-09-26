const { errorResponseBody } = require('../utils/responsebody');
const jwt = require('jsonwebtoken');
const userService = require('../Services/user.service');
const ValidateSignupRequest = async (req, res, next) => {
    if (!req.body.name) {
        errorResponseBody.err = "Name of the user is not provided.";
        return res.status(400).json(errorResponseBody);
    }
    if (!req.body.email) {
        errorResponseBody.err = "Email of the user is not provided.";
        return res.status(400).json(errorResponseBody);
    }
    if (!req.body.password) {
        errorResponseBody.err = "Passwword of the user is not provided.";
        return res.status(400).json(errorResponseBody);
    }
    next();
}

const ValidateSigninRequest = async (req, res, next) => {
    if (!req.body.email) {
        errorResponseBody.err = "Emailis not provided in sign in process.";
        return res.status(400).json(errorResponseBody);
    }
    if (!req.body.password) {
        errorResponseBody.err = "Password is not provided in sign in process.";
        return res.status(400).json(errorResponseBody);
    }
    next();
}

const isAuthenticated = async (req, res, next) => {

    try {
        
        const token = req.header("x-access-token");
        if (!token) {
            errorResponseBody.err = "No token provided.";
            return res.status(403).json(errorResponseBody);
        }
        
        const response = jwt.verify(token, process.env.AUTH_KEY);
        if (!response) {
            errorResponsebody.err = "Token not verified.";
            return res.status(401).json(errorResponseBody);
        }
        const user = await userService.getUserById(response.id);
        req.user = user.id;
        next();
    }
    catch(error){
        console.log(error);
        if(error.code == 404){
            errorResponseBody.err = "User does not exist.";
            return res.status(404).json(errorResponseBode);
        }
        if(error.name == "JsonWebTokenError" || error.name == "TokenExpiredError"){
            errorResponseBody.err = error.message;
            return res.status(401).json(errorResponseBody);
        }
        return res.status(500).json(errorResponseBody);
    }
}

const ValidateResetPassword = async (req, res, next) => {
    if(!req.body.oldPassword){
        errorResponseBody.err = "OldPassword is required to reset the password";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.newPassword){
        errorResponseBody.err = "Please provide the new password";
        return res.status(400).json(errorResponseBody);
    }
    next();
}

module.exports = {
    ValidateSignupRequest, ValidateSigninRequest, isAuthenticated, ValidateResetPassword
}

const x = "ghgf";


