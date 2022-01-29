const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req,res,next)=>{
    const token = req.header('authorization');
    if(!token) return res.status(401).send('Access is denied...');

    try{
        const decoded = jwt.verify(token,config.get('Jwt'));
        req.user = decoded;
        next();
    }
    catch(ex){
        res.status(400).send('Invalid Token...');
    }
}