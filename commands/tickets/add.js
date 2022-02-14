const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    message.delete();

    if(!message.channel.name.startsWith("ticket-")) return message.channel.send({ content: `<@${message.author.id}>, šo komandu drīkst izmantot tikai ticket kanālos!` }).then(m => { setTimeout(() => m.delete(), 15000)});
    let userAdd = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]) || message.guild.members.cache.get(args[0]);
    if(!userAdd) return message.channel.send({ content: "Tev jānorāda lietotājs." });

    let addingEm = new MessageEmbed()
    .setDescription(`<@${message.author.id}> pievienoja <@${userAdd.id}> šim ticketam.`)
    .setColor(bot.colors.green)
    .setFooter(bot.user.username, bot.user.avatarURL())
    .setTimestamp(new Date());

    message.channel.permissionOverwrites.edit(userAdd, { 
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true
    });
    message.channel.send({ embeds: [addingEm] });
    await bot.wait(1500);
    await message.channel.send({ content: `<@${userAdd.id}>` });
};

module.exports.config = {
    name: "add",
    category: "tickets",
    usage: "add <@Lietotājs/Lietotāja ID>",
    description: "Pievieno norādīto lietotāju, pie ticketa"
};