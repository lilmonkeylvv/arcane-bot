const { MessageEmbed } = require('discord.js')

module.exports.run = async (bot, message, args) => {
    message.delete();

    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send({ content: `<@${message.author.id}>, tev nav pieeju šādai darbībai!` }).then(m => { setTimeout(() => m.delete(), 150000)});
    let mChannel = message.mentions.channels.first();

    if(mChannel){
        args = args.slice(1).join(" ");

        let embed = new MessageEmbed()
        .setColor(bot.colors.yellow)
        .setDescription(args)
        .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setTimestamp(new Date());

        mChannel.send({embeds: [embed] });
    } else {
        args = args.join(" ");
        
        let embed = new MessageEmbed()
        .setColor(bot.colors.yellow)
        .setDescription(args)
        .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setTimestamp(new Date());

        message.channel.send({embeds: [embed] });
    };
};


module.exports.config = {
    name: "say2",
    aliases: ["announce2"],
    category: "moderation",
    usage: "say (#Channel) <Message>",
    description: "Aizsūta paziņojumu, noteiktajā kanālā"
}