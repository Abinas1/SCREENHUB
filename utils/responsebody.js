//This object will be used to building error response
const errorResponseBody = {
    err:{},
    data:{},
    message:'Error in searching the movie',
    success: false
}
//This object will be used to building success response

const successResponseBody = {
    err:{},
    data:{},
    message:'successfully fetched the movie details',
    success:true
}

module.exports = {
    errorResponseBody,    
    successResponseBody
} 