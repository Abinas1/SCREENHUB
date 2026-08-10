const errorResponseBody = {
    err:{},
    data:{},
    message:'Error in searching the movie',
    success: false
}
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