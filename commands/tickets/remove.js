const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    message.delete();
    
    let staffRole = message.guild.roles.cache.get("719509669088985139");
    if(!message.member.roles.cache.has(staffRole.id)) return message.channel.send({ content: `<@${message.author.id}>, šo komandu drīkst izmantot tikai staff!` }).then(m => { setTimeout(() => m.delete(), 15000)});

    if(!message.channel.name.startsWith("ticket-")) return message.channel.send({ content: `<@${message.author.id}>, šo komandu drīkst izmantot tikai ticket kanālos!` }).then(m => { setTimeout(() => m.delete(), 15000)});

    let userDel = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]) || message.guild.members.cache.get(args[0]);
    if(!userDel) return message.channel.send({ content: "Tev jānorāda lietotājs." });

    let removingEm = new MessageEmbed()
    .setDescription(`<@${message.author.id}> noņēma <@${userDel.id}> no šī ticketa.`)
    .setColor(bot.colors.red)
    .setTimestamp(new Date())
    .setFooter(bot.user.username, bot.user.avatarURL());

    message.channel.permissionOverwrites.edit(userDel, { 
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false
    });
    message.channel.send({ embeds: [removingEm] });
};

module.exports.config = {
    name: "remove",
    category: "tickets",
    usage: "remove <@Lietotājs/Lietotāja ID>",
    description: "Noņem norādīto lietotāju, no ticketa"
};