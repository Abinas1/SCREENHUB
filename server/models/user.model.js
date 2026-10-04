const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {USER_STATUS, USER_ROLE} = require('../utils/constraints');
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
        enum : { values :[USER_ROLE.customer, USER_ROLE.admin, USER_ROLE.client], message: "Invalid user role provided"},
        default:USER_ROLE.customer
    },
    userStatus: {
        type:String,
        required: true,
        enum :{ values: [USER_STATUS.approved, USER_STATUS.pending, USER_STATUS.rejected], message: "Invalid user status provided"},
        default: USER_STATUS.approved
    }
}, {timestamps:true});
userSchema.pre('save', async function (){
    const hash = await bcrypt.hash(this.password,10);
    this.password = hash;
    
});

userSchema.methods.isValidPassword = async function (password) {
    const compare = await bcrypt.compare(password, this.password);

    return compare;
};

const User = mongoose.model('User',userSchema);
module.exports = User;