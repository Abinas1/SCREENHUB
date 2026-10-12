const {STATUS} = require('../utils/constraints');
const {errorResponseBody, successResponseBody} = require('../utils/responsebody');
const bookingService = require('../Services/booking.service');

const create = async (req, res) =>{
    try{
        let userId = req.user;
        console.log({...req.body, userId : userId});
        const response = await bookingService.createBooking({...req.body, userId : userId});
        successResponseBody.message = "Successfully created the booking";
        successResponseBody.data = response;
        return res.status(STATUS.CREATED).json(successResponseBody);
    }
    catch(error){
        console.log(error.err);
        if(error.code){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}
module.exports = {create}