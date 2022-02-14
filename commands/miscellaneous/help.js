const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { readdirSync } = require("fs");

module.exports.run = async (bot, message, args) => {
       message.delete();

       let dmEmbed = new MessageEmbed()
       .setDescription(`<@${message.author.id}> paskaties tavos DM!`)
       .setFooter(bot.user.username, bot.user.displayAvatarURL())
       .setTimestamp(new Date())
       .setColor(bot.colors.yellow);

       const embed = new MessageEmbed()
       .setColor(bot.colors.yellow)
       .setAuthor(`${message.guild.me.displayName} Palīdzība`, message.guild.iconURL)
       .setTimestamp(new Date())
       .setThumbnail(bot.user.displayAvatarURL);
       
       if (!args[0]){
              const categories = readdirSync("./commands/")
  
              embed.setDescription(`Pieejamās komandas \`${message.guild.me.displayName}\`\nBota priedēklis: \`${bot.prefix}\``)
              embed.setFooter(`© ${message.guild.me.displayName} | Kopējās komandas: ${bot.commands.size}`, bot.user.displayAvatarURL());
  
              categories.forEach(category => {
                     const dir = bot.commands.filter(c => c.config.category === category)
                     const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                     try {
                            embed.addField(`» ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``).join(", "))
                     } catch(e) {
                            console.log(e);
                     };
              });
  
              message.channel.send({ embeds: [dmEmbed] }).then(m => { setTimeout(() => m.delete(), 15000)});
              return message.author.send({ embeds: [embed] });
       } else {
              let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase());
              if(!command) return message.channel.send({ embeds: [ embed.setTitle("Nepareiza komanda.").setDescription(`Raksti \`${bot.prefix}help\` lai redzētu visas komandas.`) ] });
              command = command.config;
  
              embed.setDescription(stripIndents`Bota priedēklis: \`${bot.config.default_prefix}\`\n
              **Komanda:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
              **Apraksts:** ${command.description || "Apraksts netika atrasts"}
              **Izmantojums:** ${command.usage ? `\`${prefix}${command.usage}\`` : "Lietojums netika atrasts"}
              **Aliases:** ${command.aliases ? command.aliases.join(", ") : "Aliases netika atrastas"}`);
  
              return message.channel.send({ embeds: [embed] }).then(m => { setTimeout(() => m.delete(), 150000)});
       }
}

module.exports.config = {
       name: "help",
       category: "miscellaneous",
       usage: "help",
       description: "Uzrāda visas komandas"
}