const chalk = require('chalk');
const moment = require('moment');

async function nowReady(bot){
       // Wait till start
       await bot.wait(1000);
       let dateNow = moment(new Date()).format("LTS");

       // Ready bot.print
       bot.print(chalk`\n{gray [${dateNow}]} {green Starting up}{rgb(255,255,255) ...}`);
       await bot.wait(1500);
       dateNow = moment(new Date()).format("LTS");
       bot.print(chalk`{gray [${dateNow}]} {green Started}{rgb(255,255,255) !}`);
       bot.print(chalk`{rgb(255, 216, 0) ·········································}`)

       // Set status and activity
       dateNow = moment(new Date()).format("LTS");
       bot.print(chalk`{gray [${dateNow}]} {cyan Setting statuses}{rgb(255,255,255) ...}`);
       await bot.wait(1000);
       setStatuses(bot);
       await bot.wait(500);
       dateNow = moment(new Date()).format("LTS");
       bot.print(chalk`{gray [${dateNow}]} {cyan Statuses have been set}{rgb(255,255,255) !}\n`);    
};

function setStatuses(bot){
       bot.user.setStatus('dnd');
       bot.user.setActivity("over Arcane.lv · ARCANE", { type: "WATCHING" });
};

module.exports = {
       nowReady,
       setStatuses
};
