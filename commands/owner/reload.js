const cp = require('child_process');
const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const chalk = require('chalk');
const moment = require('moment');

module.exports.run = async (bot, message, args) => {
    message.delete();
    const dateNow = moment(new Date()).format("LTS");
    
    if(message.author.id != bot.ownerId) return message.channel.send({ content: `<@${message.author.id}>, tev nav pieeju šādai darbībai!` }).then(m => { setTimeout(() => m.delete(), 10000)});

    let commandName = args[0];
    if(!commandName) return message.channel.send({ content: `<@${message.author.id}>, norādi komandu.` }).then(m => { setTimeout(() => m.delete(), 1500)});
    const commandFolders = readdirSync('./commands');
    commandName = commandName.toLowerCase();
    const folderName = commandFolders.find(folder => readdirSync(`./commands/${folder}`).includes(`${commandName}.js`));

    try {
        delete require.cache[require.resolve(`../${folderName}/${commandName}.js`)];
        bot.commands.delete(commandName);
        
        let reloadingEmbed = new MessageEmbed()
        .setColor(bot.colors.d_blue)
        .setDescription(`\`${commandName}\` komanda tiek pārlādēta!`)
        .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setTimestamp(new Date());
        
        let reloadedEmbed = new MessageEmbed()
        .setColor(bot.colors.d_blue)
        .setDescription(`\`${commandName}\` komanda pārlādēta!`)
        .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setTimestamp(new Date());
        
	    message.channel.send({ embeds: [reloadingEmbed] }).then(async (m) => { 
            console.log(chalk`{gray [${dateNow}]} {cyan Reloading ${commandName}.js}{rgb(255,255,255) ...}`);
            cp.exec(`git pull`);
            await bot.wait(500);
            const pull = require(`../${folderName}/${commandName}.js`);
            bot.commands.set(commandName, pull);
            m.edit({ embeds: [reloadedEmbed] }).then(m2 => { setTimeout(() => m2.delete(), 15000)}); 
            console.log(chalk`{gray [${dateNow}]} {cyan Reloaded ${commandName}.js} {green successfully}{rgb(255,255,255) !}\n`);    
        });
	} catch (error) {
        let errEmbed = new MessageEmbed()
        .setColor(bot.colors.red)
        .setDescription(`Nesanāca pārlādēt: \`${commandName}\``)
        .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setTimestamp(new Date());

	    message.channel.send({ embeds: [errEmbed] }).then(m => { setTimeout(() => m.delete(), 15000)});
	};
};

module.exports.config = {
    name: "reload",
    aliases: ["r"]
};