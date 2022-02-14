const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete();

    if(!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send({ content: `<@${message.author.id}>, tev nav pieeju šādai darbībai!` }).then(m => { setTimeout(() => m.delete(), 150000)});

    let bMember = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]) || message.guild.members.cache.get(args[0]);
    if(!args[0] || !bMember) return message.channel.send({ content: "Norādi lietotāju." }).then(m => { setTimeout(() => m.delete(), 5000)})

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "Iemesls netika norādīts";

    if(!message.guild.me.permissions.has("BAN_MEMBERS")) return message.channel.send({ content: "Man nav pieeju šādai darbībai!" }).then(m => { setTimeout(() => m.delete(), 5000)});

    // embedi 
    let banetDMEm = new MessageEmbed()
    .setColor(bot.colors.red)
    .setAuthor(message.guild.name, message.guild.iconURL())
    .setDescription(`Sveiki, tu tiki nobanots no **${message.guild.name}** par **${reason}**`)
    .setFooter(`Nobanoja ${message.author.username}`, message.author.displayAvatarURL())
    .setTimestamp(new Date());

    let banetPublicEm = new MessageEmbed()
    .setColor(bot.colors.red)
    .setDescription(`<@${bMember.id}> tika nobanots.`)
    .setFooter(`Nobanoja ${message.author.username}`, message.author.displayAvatarURL())
    .setTimestamp(new Date());

    let modLogEm = new MessageEmbed()
    .setColor(bot.colors.red)
    .setAuthor(`Jauns bans`, bMember.user.displayAvatarURL({ dynamic: true }))
    .addField(`Lietotājs:`, `<@${bMember.id}>`, true)
    .addField(`Moderātors:`, `<@${message.author.id}>`, true)
    .addField(`Iemesls:`, reason, false)
    .setFooter(bot.user.username, bot.user.displayAvatarURL())
    .setTimestamp(new Date());


    const modLog = bot.channels.cache.get('676439127909990440');
    if(bMember.user.bot === true){
        message.guild.bans.create(bMember, { days: 7, reason: reason }).catch(err => {});
    } else {
        bMember.send({ embeds: [banetDMEm] }).then(() => message.guild.members.ban(bMember, { days: 7, reason: reason })).catch(err => {});
    };
    modLog.send({ embeds: [modLogEm] });
    message.channel.send({ embeds: [banetPublicEm] }).then(m => { setTimeout(() => m.delete(), 5000)});
}

module.exports.config = {
    name: "ban",
    aliases: ["pban"],
    category: "moderation",
    description: "Nobano norādīto lietotāju",
    usage: "ban <@Lietotājs> (iemesls)",
}