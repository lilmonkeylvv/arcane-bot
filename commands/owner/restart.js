const { MessageEmbed } = require("discord.js");
const exitSequence = require('../../functions/cleanups/exitFunctions');

module.exports.run = async (bot, message, args) => {
       message.delete();
       
       if(message.author.id != bot.ownerId) return message.channel.send({ content: `<@${message.author.id}>, tev nav pieeju šādai darbībai!` }).then(m => { setTimeout(() => m.delete(), 10000)});

       let type = args[0];

       let embed = new MessageEmbed()
       .setDescription(`💥 **${bot.user.username}** is restarting! 💥`)
       .setTimestamp(new Date())
       .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
       .setColor(bot.colors.yellow);

       if(!type) type = 1;
       if(type == 1){
              message.channel.send({ embeds: [embed] }).then(m => { setTimeout(() => m.delete(), 1000)});
              await bot.wait(1600);
              await exitSequence(bot);
       };
}

module.exports.config = {
       name: "restart",
       aliases: ["stop", "rr"]
}