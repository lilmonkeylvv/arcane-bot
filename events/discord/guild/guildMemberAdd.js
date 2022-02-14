const { MessageEmbed } = require('discord.js');

module.exports = async (bot, member) => {
    const logChannelId = "906884194532200448";
    const logChannel = bot.channels.cache.get(logChannelId);

    let joinedEmbed = new MessageEmbed()
    .setColor(bot.colors.green)
    .setTitle("Jauns lietotājs")
    .addField("Lietotājs:", `${member}`)
    .setFooter(`Arcane.lv`, bot.arcaneLogo)
    .setTimestamp(new Date());

    logChannel.send({ embeds: [joinedEmbed] });
};