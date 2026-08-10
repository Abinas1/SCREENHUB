const mongoose = require('mongoose');
/* Define the scema of theatre resource to be stored in db */

const theatreSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description: String,
    city :{
        type:String,
        required: true
    },
    pincode :{
        type: Number,
        required: true
    },
    address : String
}, {timestamp : true});

const Theatre = mongoose.model('Theatre', theatreSchema);

module.exports = Theatre;