const winston = require('winston');

module.exports = function(){
    winston.exceptions.handle(
        new winston.transports.File({ 
            filename:'uncaughtExceptions.log',
        })
    );
    winston.add(new winston.transports.File({ filename:'logFile.log'}));
}