const { errorResponseBody } = require('../utils/responsebody');
const jwt = require('jsonwebtoken');
const userService = require('../Services/user.service');
const {USER_ROLE, STATUS} = require('../utils/constraints');
const ValidateSignupRequest = async (req, res, next) => {
    if (!req.body.name) {
        errorResponseBody.err = "Name of the user is not provided.";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    if (!req.body.email) {
        errorResponseBody.err = "Email of the user is not provided.";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    if (!req.body.password) {
        errorResponseBody.err = "Passwword of the user is not provided.";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    next();
}

const ValidateSigninRequest = async (req, res, next) => {
    if (!req.body.email) {
        errorResponseBody.err = "Emailis not provided in sign in process.";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    if (!req.body.password) {
        errorResponseBody.err = "Password is not provided in sign in process.";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    next();
}

const isAuthenticated = async (req, res, next) => {

    try {
        
        const token = req.header("x-access-token");
        if (!token) {
            errorResponseBody.err = "No token provided.";
            return res.status(STATUS.FORBIDDEN).json(errorResponseBody);
        }
        
        const response = jwt.verify(token, process.env.AUTH_KEY);
        if (!response) {
            errorResponsebody.err = "Token not verified.";
            return res.status(STATUS.UNAUTHORISED).json(errorResponseBody);
        }
        const user = await userService.getUserById(response.id);
        req.user = user.id;
        next();
    }
    catch(error){
        console.log(error);
        if(error.code == STATUS.NOT_FOUND){
            errorResponseBody.err = "User does not exist.";
            return res.status(STATUS.NOT_FOUND).json(errorResponseBode);
        }
        if(error.name == "JsonWebTokenError" || error.name == "TokenExpiredError"){
            errorResponseBody.err = error.message;
            return res.status(STATUS.UNAUTHORISED).json(errorResponseBody);
        }
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const ValidateResetPassword = async (req, res, next) => {
    if(!req.body.oldPassword){
        errorResponseBody.err = "OldPassword is required to reset the password";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    if(!req.body.newPassword){
        errorResponseBody.err = "Please provide the new password";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    next();
}
const ValidateUpdateUser = async (req, res, next) =>{
    if(!req.body.userRole && !req.body.userStatus){
        errorResponseBody.err = "Please provide the user role or user status to update.";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    next();
}
const isAdmin = async (req, res, next) =>{
    console.log(req.user);
    const user = await userService.getUserById(req.user);
    if(user.userRole!= USER_ROLE.admin){
        errorResponseBody.err = "User is not an admin.";
        return res.status(STATUS.UNAUTHORISED).json(errorResponseBody);
    }
    next();
}

const isClient = async (req, res, next) =>{
    const user = await userService.getUserById(req.user);
    if(user.userRole!= USER_ROLE.client){
        errorResponseBody.err = "User is not a Client.";
        return res.status(STATUS.UNAUTHORISED).json(errorResponseBody);
    }
    next();
}

const isAdminOrClient = async (req, res, next) =>{
    const user = await userService.getUserById(req.user);
    if(user.userRole!= USER_ROLE.admin && user.userRole!= USER_ROLE.client ){
        errorResponseBody.err = "User is not an admin as well as client.";
        return res.status(STATUS.UNAUTHORISED).json(errorResponseBody);
    }
    next();
}

module.exports = {
    ValidateSignupRequest, 
    ValidateSigninRequest, 
    isAuthenticated, 
    ValidateResetPassword, 
    ValidateUpdateUser, 
    isAdmin, 
    isClient, 
    isAdminOrClient 
}



