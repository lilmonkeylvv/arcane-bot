const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
    
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send({ content: `<@${message.author.id}>, tev nav pieeju šādai darbībai!` }).then(m => { setTimeout(() => m.delete(), 150000)});

    let jaut = args.join(" ");
    if(!jaut) return message.channel.send({ content: `<@${message.author.id}>, norādi jautājumu.` }).then(m => { setTimeout(() => m.delete(), 150000)});

    let poll = new MessageEmbed()
    .setDescription(jaut)
    .setAuthor(`Izveidoja - ${message.author.username}`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    .setFooter(`Izmanto reakcijas zemāk.`, bot.user.displayAvatarURL())
    .setTimestamp(new Date())
    .setColor(bot.colors.d_blue);
    
    message.channel.send({ embeds: [poll] }).then(async (msg) => {
        await msg.react('✅');
        await msg.react('❌');
    });  
};

module.exports.config = {
    name: "poll",
    description: "Izveido aptauju",
    usage: "poll <Jautājums>",
    category: "moderation"
};