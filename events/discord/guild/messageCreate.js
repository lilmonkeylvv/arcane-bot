const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = async (bot, message) => {
       bot.MSGauthorIMG = message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
       bot.arcaneLogo = "https://i.ibb.co/GcVJ2zr/arcane.png"

       if(!message.guild) return;
       if(message.guild.id == "873141467999240222") return;

       let staffRole = message.guild.roles.cache.get("719509669088985139");
       let leetRole = message.guild.roles.cache.get("584424952011161610");
       let suggestionChannelID = "686825492057554945";

       if(message.channel.id == suggestionChannelID){
              if(message.member.roles.cache.has(staffRole.id) || message.member.roles.cache.has(leetRole.id)) return;
              if(message.content.includes("http://") || message.content.includes("https://")){
                     if(bot.allowedLinks.some(link => message.content.includes(link))){
                            await message.react("<a:6181_check:718439373233717308>");
                            await message.react("<:x_:718439672467947581>");
                            return;
                     } else {
                            if(message.member.roles.cache.has(staffRole.id) || message.member.roles.cache.has(leetRole.id)) return;
                            await message.delete();
                     };
              };

              await message.react("<a:6181_check:718439373233717308>");
              await message.react("<:x_:718439672467947581>");
       } else if(message.channel.id != suggestionChannelID || !message.channel.name.startsWith("ticket-")){
              if(message.content.includes("http://") || message.content.includes("https://")){
                     if(bot.allowedLinks.some(link => message.content.includes(link))){
                            return;
                     } else {
                            if(message.member.roles.cache.has(staffRole.id) || message.member.roles.cache.has(leetRole.id)) return;
                            await message.delete();
                     };
              };
              if(message.content.toLowerCase().includes(`interv`)){
                     if(message.member.roles.cache.has(staffRole.id) || message.member.roles.cache.has(leetRole.id)) return;
              
                     const intEm = new MessageEmbed()
                     .setColor(bot.colors.red)
                     .setAuthor("???? Piespraude")
                     .setDescription(stripIndents`Par interviju, sazinies ar k??du no <@&584425208094523418> - **priv??ti**!
                     Ja to dar??si iek?? k??da no ??atiem, n??kamreiz sa??emsi autom??tisku mute!
                     
                     **Ja tev liekas, ka zi??a bija nepareizi ats??t??ta, uzraksti <@286540906335830017>**`)
                     .setFooter("Arcane.lv", bot.arcaneLogo)
                     .setTimestamp(new Date());

                     message.reply({ embeds: [intEm], ephemeral: true });
              } else if(message.content.toLowerCase().includes(`whitelist`) || message.content.toLowerCase().includes(`wl`)){
                     if(message.member.roles.cache.has(staffRole.id) || message.member.roles.cache.has(leetRole.id)) return;

                     const wlEm = new MessageEmbed()
                     .setColor(bot.colors.red)
                     .setAuthor("???? Piespraude")
                     .setDescription(stripIndents`Lai nok??rtotu whitelist m??su server??, dodies uz **http://arcane.lv/register**.
                     Ja ir k??di citi jaut??jumi, dodies uz <#785192901658673154>
                     
                     **Ja tev liekas, ka zi??a bija nepareizi ats??t??ta, uzraksti <@286540906335830017>**`)
                     .setFooter("Arcane.lv", bot.arcaneLogo)
                     .setTimestamp(new Date());

                     message.reply({ embeds: [wlEm], ephemeral: true });
              } else if(message.content.toLowerCase().includes(`nejiet`) || message.content.toLowerCase().includes(`neiet`) || message.content.toLowerCase().includes(`netiek`)){
                     if(message.member.roles.cache.has(staffRole.id) || message.member.roles.cache.has(leetRole.id)) return;

                     const netEm = new MessageEmbed()
                     .setColor(bot.colors.red)
                     .setAuthor("???? Piespraude")
                     .setDescription(stripIndents`Ja tu netiec m??jaslap?? vai server??, izveido IP ticketu - <#656878910033625089>!
                     Ja ir k??di citi jaut??jumi, dodies uz <#785192901658673154>.
                     
                     **Ja tev liekas, ka zi??a bija nepareizi ats??t??ta, uzraksti <@286540906335830017>**`)
                     .setFooter("Arcane.lv", bot.arcaneLogo)
                     .setTimestamp(new Date());

                     message.reply({ embeds: [netEm], ephemeral: true });
              };
       };

       bot.prefix = bot.config.default_prefix;
       let args = message.content.slice(bot.prefix.length).trim().split(/ +/g);
       let cmd = args.shift().toLowerCase();
       
       if (message.author.bot || !message.content.startsWith(bot.prefix)) return;
       if (message.content.startsWith(bot.prefix) && message.content.length === bot.prefix.length) return;
       let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
       if(!commandfile) return;
       if(commandfile) commandfile.run(bot, message, args);
};