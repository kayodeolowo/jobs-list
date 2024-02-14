const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//create user
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Enter your name']
    },

    email:{
        type: String,
        required: [true, 'Enter your email'],
        unique: true,
        validate: [validator.isEmail, 'please enter valid email address']
    },

    role: {
        type: String,
        enum: {
            values: ['user', 'employer'],
            message: 'please select role'
        },
       default: 'user'
    },

    password:{
        type: String,
        required: [true, 'enter password'],
        minLength: [8, 'your password must be 8 characters long'],
        select: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    resetPasswordToken: String,
    resetPasswordExpire: String,


})

//encrypt password before saving
userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 10)
})

//return json
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}


//compare user password with database password
userSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password)
}


module.exports = mongoose.model('user', userSchema);

