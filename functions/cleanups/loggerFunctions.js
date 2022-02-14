const winston = require('winston');
const chalk = require('chalk');
const moment = require('moment');

function startLogger(bot){
    bot.logger = winston.createLogger({
        transports: [ 
            new winston.transports.Console(),
        ],
        format: winston.format.printf(log => chalk`{gray [${moment(new Date()).format("LTS")}]} {redBright ${log.level.toUpperCase()}:} ${log.message}\n`),
    });
};

module.exports = startLogger;