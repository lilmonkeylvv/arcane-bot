const { MessageEmbed } = require("discord.js");
const moment = require('moment');

module.exports.run = async (bot, message, args) => {
       message.delete();

       let member = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]) || message.guild.members.cache.get(args[0]) || message.member || message.author;
       const cAt = moment(member.user.createdAt).format("DD/MM/YYYY LT");
       const jAt = moment(member.joinedAt).format("DD/MM/YYYY LT");

       const flags = {
              DISCORD_EMPLOYEE: 'Discord Employee',
              DISCORD_CERTIFIED_MODERATOR: 'Certified Discord Moderator',
              PARTNERED_SERVER_OWNER: 'Discord Partner',
              BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
              BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
              HYPESQUAD_EVENTS: 'HypeSquad Events',
              HOUSE_BRAVERY: 'House of Bravery',
              HOUSE_BRILLIANCE: 'House of Brilliance',
              HOUSE_BALANCE: 'House of Balance',
              EARLY_SUPPORTER: 'Early Supporter',
              TEAM_USER: 'Team User',
              SYSTEM: 'System',
              VERIFIED_BOT: 'Verified Bot',
              EARLY_VERIFIED_BOT_DEVELOPER: 'Verified Bot Developer'
       };

       if (member.user.bot === true) bot = "Jā"; else bot = "Nē";
       const userFlags = member.user.flags.toArray();
       let permissions = member.permissions.toArray().map(perm => {
              return perm.toLowerCase().replace(/_/g, " ").replace(/\w\S*/g, txt => {
                  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
              })
       }).join(", ");

       if (member.permissions.has("ADMINISTRATOR")) permissions = "Administrator (Visas)"
       let embed = new MessageEmbed()
       .setThumbnail(member.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true, size: 1024 }))
       .setAuthor(`Informācija par ${member.user.username}`, member.user.displayAvatarURL({ format: 'png' || 'gif', dynamic: true, size: 1024 }))
       .setColor(bot.colors.yellow)
       .addField("Pilnais vārds:", `${member.user.tag}`, true)
       .addField("ID:", member.user.id, true)
       .addField("Servera iesauka:", `${member.nickname !== null ? `${member.nickname}` : "Nav"}`, true)
       .addField("Bots (Jā/Nē):", `${bot}`, true)
       .addField("Atļaujas:", permissions, true)
       .addField("Karogi:", userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Nav', false)
       .addField("Izveidots:", cAt, true)
       .addField("Pievienojās serverim:", jAt, true)
       .setTimestamp(new Date())
       .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png' || 'gif', dynamic: true, size: 1024 }));

       message.channel.send({ embeds: [embed] }).then(m => { setTimeout(() => m.delete(), 195000)});
};

module.exports.config = {
       name: "userinfo",
       usage: "userinfo (@Lietotājs)",
       category: "miscellaneous",
       description: "Uzrāda informāciju par noteikto lietotāju",
       aliases: ["whois", "ui"]
};