const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router(); 
const { User , validate } = require('../models/user');
const auth = require('../middleware/auth');

router.get('/',auth,(req,res)=>{
    res.send(req.user);
});

router.post('/signup',async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne( { email:req.body.email} );
    if(user) return res.status(400).send("This email is already registered...");

    user = new User( _.pick(req.body,['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    await user.save();

    res.send('signed up successfully');
});

router.post('/signin',async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne( { email:req.body.email} );
    if(!user) return res.status(400).send("Invalid email or password...");

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send("Invalid email or password..."); 
    
    const token = user.generateAuthToken();
    res.json({
        auth:token,
        user:_.pick(user,['name','_id'])
    });
});

module.exports = router;