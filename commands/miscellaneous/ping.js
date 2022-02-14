const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
       message.delete();
       
       let measuring = new MessageEmbed()
       .setDescription(`Izmēra...`)
       .setFooter(bot.user.username, bot.user.displayAvatarURL())
       .setTimestamp(new Date())
       .setColor(bot.colors.yellow);

       message.channel.send({ embeds: [measuring] }).then(m => {
              let apiLatency = Math.round(bot.ws.ping);
              let botLatency = m.createdTimestamp - message.createdTimestamp;

              let embed = new MessageEmbed()
              .setDescription(`Aizkave: **${botLatency}**ms \nAPI aizkave: **${apiLatency}**ms`)
              .setColor(bot.colors.yellow)
              .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
              .setTimestamp(new Date());

              m.edit({ embeds: [embed] }).then(m => { setTimeout(() => m.delete(), 20000)});
       });
};

module.exports.config = {
       name: "ping",
       aliases: ["pingo"],
       category: "miscellaneous",
       usage: "ping",
       description: "Uzrāda bota aizkavi"
};