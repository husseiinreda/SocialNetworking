const express = require('express');
const { Post , validate } = require('../models/post');
const auth = require('../middleware/auth')
const _ = require('lodash');
const router = express.Router();

router.post('/createpost',auth,async(req,res)=>{
    req.body.postedBy = req.user.id;
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let post = new Post( _.pick(req.body,['title','body','photo','postedBy']));
    await post.save();

    res.send('Posted Successfully...');
});

router.get('/allposts',auth,async(req,res)=>{
    let post = await Post.find().populate('postedBy','id name');
    if(!post) return res.status(404).send('no posts found...')
    res.send(post);
});

router.get('/myposts',auth,async(req,res)=>{
    let post = await Post.find({postedBy:req.user.id}).populate('postedBy','id name');
    if(!post) return res.status(404).send('no posts found...')
    res.send(post);
});

router.put('/like',auth,async(req,res)=>{
    let post = await Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user.id}
    });
    if(!post) return res.status(404).send('no posts found...') 
    res.send(post);
});

router.put('/unlike',auth,async(req,res)=>{
    let post = await Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user.id}
    },{ new:true });
    if(!post) return res.status(404).send('no posts found...') 
    res.send(post);
});

module.exports = router;