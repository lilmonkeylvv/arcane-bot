const chalk = require('chalk');
const moment = require('moment');

async function exitSequence(bot){
    let dateNow = moment(new Date()).format("LTS");
    bot.print(chalk`{gray [${dateNow}]} {red Activating shutdown sequence}{rgb(255,255,255) ...}`);
    await bot.wait(550)
    dateNow = moment(new Date()).format("LTS");
    bot.print(chalk`{gray [${dateNow}]} {rgb(255,255,255) Closing threads...}`);
    await bot.wait(550)
    dateNow = moment(new Date()).format("LTS");
    bot.print(chalk`{gray [${dateNow}]} {rgb(255,255,255) Unloading commands...}`);
    await bot.wait(550)
    dateNow = moment(new Date()).format("LTS");
    bot.print(chalk`{gray [${dateNow}]} {rgb(255,255,255) Done!}`);
    await bot.wait(100)
    bot.print(chalk`{gray [${dateNow}]} {red Shutting down}{rgb(255,255,255) ...}`);
    await bot.wait(550)
    dateNow = moment(new Date()).format("LTS");
    bot.print(chalk`{gray [${dateNow}]} {red Shutdown successful}{rgb(255,255,255) !}`);
    await bot.wait(550)
    dateNow = moment(new Date()).format("LTS");
    bot.print(chalk`{gray [${dateNow}]} {rgb(255,255,255) Thank you and goodbye!}\n`);
    await process.exit();
};

module.exports = exitSequence;