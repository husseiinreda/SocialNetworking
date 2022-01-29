const mongoose = require('mongoose');
const Joi = require('joi');
const { post } = require('../routes/auth');
Joi.objectId = require('joi-objectid')(Joi)

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    body:{
        type:String,
        required:true,
        minlength:1,
        maxlength:100
    },
    photo:{
        type:String,
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
});

const Post = mongoose.model('Post',postSchema)

function validate(request){
    var schema=Joi.object({
        title:Joi.string().min(5).max(50).required(),
        body:Joi.string().min(1).max(100).required(),
        photo:Joi.string(),
        postedBy:Joi.objectId().required(),
    });
    return schema.validate(request);
}

exports.validate=validate;
exports.Post=Post;