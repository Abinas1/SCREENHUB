const userService = require('../Services/user.service');
const {errorResponseBody, successResponseBody} = require('../utils/responsebody');
const {STATUS} = require('../utils/constraints');

const update = async(req, res) =>{
    try{
        const response = await userService.updateUserRoleStatus(req.body, req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully update the user";
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        console.log(error);
        if(error.name == 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key)=>{
                err[key] = error.errors[key].message;
            });
            errorResponseBody.err = err;
            return res.status(STATUS.UNPROCESSABLE_ENTITY).json(errorResponseBody);
        }
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        
    }
}
module.exports = {update}