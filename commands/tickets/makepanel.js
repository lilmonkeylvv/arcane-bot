const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    message.delete();

    if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: `<@${message.author.id}>, tev nav pieeju šādai darbībai!` }).then(m => { setTimeout(() => m.delete(), 15000)});
    let mChannel = message.mentions.channels.first();

    if(mChannel) args = args.slice(1).join(" "); else args.slice(0).join(" ");

    let embed = new MessageEmbed()
    .setColor(bot.colors.yellow)
    .setDescription(args.toString())
    .setFooter("Arcane.lv", bot.arcaneLogo)
    .setTimestamp(new Date());

    let row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId('createticketwl')
        .setLabel('Izveidot WL ticketu')
        .setStyle('SECONDARY')
        .setEmoji('✉'),
        new MessageButton()
        .setCustomId('createticketip')
        .setLabel('Izveidot IP ticketu')
        .setStyle('SECONDARY')
        .setEmoji('✉'),
    );
    if(mChannel){
        mChannel.send({ embeds: [embed], components: [row] });
    } else {
        message.channel.send({ embeds: [embed], components: [row] });
    };
};

module.exports.config = {
    name: "makepanel",
    aliases: ["ticketpanel"],
    category: "tickets",
    usage: "ticketpanel (#Kanāls) <Ziņa>",
    description: "Aizsūta ticket paneli, noteiktajā kanālā"
};