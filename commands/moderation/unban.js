const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {
    message.delete()

    if(!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send({ content: `<@${message.author.id}>, tev nav pieeju šādai darbībai!` }).then(m => { setTimeout(() => m.delete(), 150000)});

    let bMember = await bot.users.fetch(args[0]);
    if(!args[0] || !bMember) return message.channel.send({ content: "Norādi lietotāju." }).then(m => { setTimeout(() => m.delete(), 5000)});

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "Iemesls netika norādīts";

    if(!message.guild.me.permissions.has("BAN_MEMBERS")) return message.channel.send({ content: "Man nav pieeju šādai darbībai!" }).then(m => { setTimeout(() => m.delete(), 5000)});

    let modLog = bot.channels.cache.get('676439127909990440');

    let unbanetPublic = new MessageEmbed()
    .setColor(bot.colors.red)
    .setDescription(`<@${bMember.id}> tika unbanots.`)
    .setFooter(`Unbanoja ${message.author.username}`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    .setTimestamp(new Date());

    let modLogEm = new MessageEmbed()
    .setColor(bot.colors.green)
    .setAuthor(`Jauns unbans`, message.guild.iconURL({dynamic: true}))
    .addField(`Lietotāja ID:`, `${bMember.id}`, true)
    .addField(`Moderātors:`, `<@${message.author.id}>`, true)
    .addField(`Iemesls:`, reason, true)
    .setTimestamp(new Date())
    .setFooter(bot.user.username, bot.user.displayAvatarURL());

    message.guild.bans.remove(bMember, reason).catch(err => console.log(err));
    modLog.send({ embeds: [modLogEm] });
    message.channel.send({ embeds: [unbanetPublic] }).then(m => { setTimeout(() => m.delete(), 5000)});
}

module.exports.config = {
    name: "unban",
    category: "moderation",
    description: "Unbano norādīto lietotāju",
    usage: "unban <Lietotāja ID>"
}