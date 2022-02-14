const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    message.delete();

    if(!message.channel.name.startsWith("ticket-")) return message.channel.send({ content: `<@${message.author.id}>, šo komandu drīkst izmantot tikai ticket kanālos!` }).then(m => { setTimeout(() => m.delete(), 15000)});

    let deleteingEmbed = new MessageEmbed()
    .setColor(bot.colors.red)
    .setDescription("Šis tickets, tiks izdzēsts pēc dažām sekundēm!")
    .setFooter(`${message.author.username}`, message.author.displayAvatarURL())
    .setTimestamp(new Date());

    message.channel.send({ embeds: [deleteingEmbed] });
    await bot.wait(3050);
    await message.channel.delete();
};

module.exports.config = {
    name: "delete",
    aliases: ["delticket"],
    category: "tickets",
    usage: "delete",
    description: "Izdzēš ticketu"
};