const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    message.delete();
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send({ content: `<@${message.author.id}>, tev nav pieeju šādai darbībai!` }).then(m => { setTimeout(() => m.delete(), 150000)});
    
    const amount = parseInt(args.slice(0).join(" "));
    let text = "ziņas";

    if (!amount) return message.channel.send({ content: `<@${message.author.id}>, norādi ciparu!` }).then(m => { setTimeout(() => m.delete(), 5000)});
    if(amount == 1) text = "ziņu";

    let embed = new MessageEmbed()
    .setDescription(`Dzēš **${amount}** ${text}! ♻`)
    .setColor(bot.colors.red)
    .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    .setTimestamp(new Date());

    if(amount > 100) return message.channel.send(`<@${message.author.id}>, tu nevari izdzēst vairāk par 100 ziņām!`).then(m => { setTimeout(() => m.delete(), 5000)});
    if(amount < 1) return message.channel.send(`<@${message.author.id}>, tu nevari izdzēst mazāk ziņās par 1!`).then(m => { setTimeout(() => m.delete(), 5000)});

    message.channel.send({embeds: [embed] }).then(m => { setTimeout(() => m.delete(), 2000)});
    setTimeout(() => { message.channel.bulkDelete(amount, true).then(() => {}) }, 2500);
};

module.exports.config = {
    name: "purge",
    usage: "purge <Skaitlis no 1-100>",
    description: "Izdzēš noteiktā daudzuma ziņās",
    category: "moderation",
    aliases: ["clear", "p"]
}