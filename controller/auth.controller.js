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
        errorResponseBody.err = error;
        errorResponseBody.message = "Signup failed.";
        return res.status(500).json(errorResponseBody);
    }
}


module.exports = {signup}