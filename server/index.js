const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');
const auth = require('./routes/auth');
const post = require('./routes/post');
const { MongoURI } = require('./valueKeys');
require('./logging')();
const app = express();
const PORT = 5000;

mongoose.connect(MongoURI)
    .then(()=> winston.info(`MongoDB connected...`))

app.listen(PORT,()=>{
    winston.info(`server listening on port ${PORT}`);
});

app.use(express.json())
app.use(auth);
app.use(post);