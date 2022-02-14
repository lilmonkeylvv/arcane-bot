const { readdirSync } = require("fs");
const chalk = require('chalk');
const moment = require("moment");
const log = console.log;

module.exports = (bot) => {
       const dateNow = moment(new Date()).format("LTS");
       const load = dir => {
              const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
              for (let file of commands) {
                     let pull = require(`../commands/${dir}/${file}`);
                     if (pull.config.name){
                            bot.commands.set(pull.config.name, pull);
                     } else {
                            log(chalk`{gray [${dateNow}]} {cyan ${file}} was loaded {red unsuccessfully}{rgb(255,255,255) !}`);
                     };
                     if (pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name));
              };
       };
       ["miscellaneous", "moderation", "owner", "tickets"].forEach(x => load(x));
};