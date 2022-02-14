const { MessageEmbed } = require('discord.js');

module.exports = async (bot, ban) => {
        const logChannelId = "906884194532200448";
        const logChannel = bot.channels.cache.get(logChannelId);
    
        const fetchedLogs = await ban.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD',
	});
	const banLog = fetchedLogs.entries.first();
	const { executor, target } = banLog;

        let bannedEmbed = new MessageEmbed()
        .setColor(bot.colors.red)
        .setTitle("Izbanots lietotājs")
        .addField("Lietotājs:", `${ban.user.tag}`)
        .addField("Moderators:", `<@${executor.id}>`)
        .setFooter(`Arcane.lv`, bot.arcaneLogo)
        .setTimestamp(new Date());

        let bannedEmbedLoh = new MessageEmbed()
        .setColor(bot.colors.red)
        .setTitle("Izbanots lietotājs")
        .addField("Lietotājs:", `${ban.user.tag}`)
        .setFooter(`Arcane.lv`, bot.arcaneLogo)
        .setTimestamp(new Date());

	if(target.id === ban.user.id){
                logChannel.send({ embeds: [bannedEmbed] });
	} else {
                logChannel.send({ embeds: [bannedEmbedLoh] });
	};
};