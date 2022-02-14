const { MessageEmbed } = require('discord.js');

module.exports = async (bot, member) => {
    const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK',
	});
    const banLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD',
	});

    const logChannelId = "906884194532200448";
    const logChannel = bot.channels.cache.get(logChannelId);

	const banLog = banLogs.entries.first();
	const kickLog = fetchedLogs.entries.first();
    const { executor, target } = kickLog;

    let kickedEmbed = new MessageEmbed()
    .setColor(bot.colors.red)
    .setTitle("Izkikots lietotājs")
    .addField("Lietotājs:", `${member.user.tag}`)
    .addField("Moderators:", `<@${executor.id}>`)
    .setFooter(`Arcane.lv`, bot.arcaneLogo)
    .setTimestamp(new Date());

    let leftEmbed = new MessageEmbed()
    .setColor(bot.colors.red)
    .setTitle("Lietotājs izgāja")
    .addField("Lietotājs:", `${member.user.tag}`)
    .setFooter(`Arcane.lv`, bot.arcaneLogo)
    .setTimestamp(new Date());

	if(target.id === member.id && kickLog){
        logChannel.send({ embeds: [kickedEmbed] });
    } else if(banLog && banLog.target === member.id){
        return;
	} else {
        logChannel.send({ embeds: [leftEmbed] });
	};
};