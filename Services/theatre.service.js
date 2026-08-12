const Theatre = require('../models/theatre.model');

const createTheatre = async (data) =>{
    try{
        const response = await Theatre.create(data);
        return response;
    }
    catch(error){
        console.log(error);
        if(error.name == 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key) =>{
                err[key] = error.errors[key].message;
            });
            return {err:err, code:422};
        }
        throw err; 
    }
    
}

const getTheatre = async (id) =>{
    try{
        const response = await Theatre.findById(id);
        console.log(id);
        if(!response){
            return {
                err:"No theatre found for the id",
                code: 404
            }
        }
        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

const getAllTheatre = async ()=>{
    try{
        
        const response = await Theatre.find({});
        console.log(response);
        if(!response){
            throw {err: "No theatre exists in the database",
                code:404
            }
        }
        return response;
    }
    catch(error){
        console.log(error);
        throw error
    }
}

module.exports = {
    createTheatre, getTheatre, getAllTheatre
}