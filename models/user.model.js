const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email: {
        type:String,
        required: true,
        unique:true,
        lowercase:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email'],
        trim:true
    },
    password:{
        type:String,
        required: true,
        minlength:6
    },
    userRole:{
        type:String,
        required:true,
        default:"CUSTOMER"
    },
    userStatus: {
        type:String,
        required: true,
        default: "APPROVED"
    }
}, {timestamps:true});
userSchema.pre('save', async function (){
    console.log(this.password);
    const hash = await bcrypt.hash(this.password,10);
    console.log(hash);
    this.password = hash;
    
})
const User = mongoose.model('User',userSchema);
module.exports = User;