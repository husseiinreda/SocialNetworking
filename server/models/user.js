const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
const PasswordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        unique:true,
        required:true,
        pattern:/.*@.*.com$/
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({
        id:this._id
    },config.get('Jwt'));
    return token;
}

const User = mongoose.model('User',userSchema);

function validate(request){
    var schema=Joi.object({
        name:Joi.string().min(5),
        email:Joi.string().required().email(),
        password:new PasswordComplexity().required()
    });
    return schema.validate(request);
}

exports.User=User;
exports.validate=validate;