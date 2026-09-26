const jwt = require('jsonwebtoken'); 

const UserService = require('../Services/user.service');
const {successResponseBody, errorResponseBody} = require('../utils/responsebody');

const signup = async (req, res) =>{
    try{
        const response =await UserService.createUser(req.body);
        successResponseBody.message = "Successfully register the user";
        successResponseBody.data = response;
        return res.status(201).json(successResponseBody);
    }
    catch(error){
        console.log(error);
        if(error.err){
            errorResponseBody.err=error.err;
            errorResponseBody.message = "Please provide valid input";
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        errorResponseBody.message = "Signup failed.";
        return res.status(500).json(errorResponseBody);
    }
}
const signin = async(req, res) =>{
    try{
        const response = await UserService.getUserByEmail(req.body.email);
        const isValidPassword = await response.isValidPassword(req.body.password);

        if(!isValidPassword){
            errorResponseBody.err = "Invalid password for the given email";
            return res.status(401).json(errorResponseBody);
        }
        const token = jwt.sign({id:response.id, email: response.email}, process.env.AUTH_KEY, {expiresIn: "1h"});
        
        successResponseBody.message = "Successfully Logied in";
        successResponseBody.data = {
            email : response.email,
            role : response.userRole,
            status: response.status,
            token : token
        }
        return res.status(200).json(successResponseBody);

    }catch(error){
        console.log(error);
        errorResponseBody.err = error.err;
        errorResponseBody.message = "Log in Failed.";
        if(error.err){
            return res.status(error.code).json(errorResponseBody);
        }
        return res.status(500).json(errorResponseBody);
    }
}

const resetPassword = async (req, res) =>{
    try{
        const user = await UserService.getUserById(req.user);
        
        const isOldPasswordCorrect = await user.isValidPassword(req.body.oldPassword);
        if(!isOldPasswordCorrect){
            throw {err:"Invalid old password", code :403};
        }
        user.password = req.body.newPassword;
        await user.save();
        successResponseBody.data = user;
        return res.status(200).json(successResponseBody);
    }
    catch(error){
        console.log(error);
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        if(error.name == 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key)=>{
                err[key] = error.errors[key].message;
            });
            errorResponseBody.err = err;
            return res.status(422).json(errorResponseBody);
        }
        errorResponseBody.err = error.err;
        return res.status(500).json(errorResponseBody);
    }
}

module.exports = {signup, signin, resetPassword}