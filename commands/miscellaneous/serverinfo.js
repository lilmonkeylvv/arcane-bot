const { stripIndents } = require("common-tags");
const { MessageEmbed } = require("discord.js");
const moment = require('moment');

module.exports.run = async (bot, message, args) => {
       message.delete();

       const members = message.guild.members.cache;
       const emojis = message.guild.emojis.cache;

       let verifLevels = {
              "NONE": "None",
              "LOW": "Low (Must have a verified email)",
              "MEDIUM": "Medium (Must be registered in discord for 5 minutes)",
              "HIGH": "**(╯°□°）╯︵ ┻━┻** (Must be in the server for 10 minutes)",
              "VERY_HIGH": "**(ノಠ益ಠ)ノ彡┻━┻** (Must have a verified phone number)"
       };
       let premiumTiers = {
              "NONE": "Tier 0",
              "TIER_1": "Tier 1",
              "TIER_2": "Tier 2",
              "TIER_3": "Tier 3"
       };

       const embed = new MessageEmbed()
       .setAuthor(message.guild.name, message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
       .addField("Vārds:", `${message.guild.name}`, true)
       .addField("ID:", `${message.guild.id}`, true)
       .addField("Īpašnieks:", `<@${message.guild.ownerId}>`, false)
       .addField("Boost līmenis:", premiumTiers[message.guild.premiumTier], true)
       .addField("Drošības līmenis:", verifLevels[message.guild.verificationLevel], false)
       .addField("Statistika:", stripIndents`Emoji daudzums: ${emojis.size}
       Biedru daudzums: ${message.guild.memberCount}
       Cilvēki: ${members.filter(member => !member.user.bot).size}
       Boti: ${members.filter(member => member.user.bot).size}`, true)
       .addField("Izveidots:", `${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`, false)
       .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
       .setTimestamp(new Date())
       .setColor(bot.colors.yellow)
       .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }));
       message.channel.send({ embeds: [embed] }).then(m => { setTimeout(() => m.delete(), 150000)});
};

module.exports.config = {
       name: "serverinfo",
       aliases: ["si"],
       category: "miscellaneous",
       usage: "serverinfo",
       description: "Uzrāda discord servera informāciju"
};