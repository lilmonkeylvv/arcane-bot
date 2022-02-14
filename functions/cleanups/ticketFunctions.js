const { stripIndents } = require("common-tags");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const dcModId = 676439127909990440;

function sendTicketLog(interaction, embed, id){
    let server = interaction.guild;
    let chan = server.channels.cache.find(c => c.id == id);

    chan.send({ embeds: [embed] })
};

async function createTicketWL(interaction, bot){
    let i = interaction;
    let server = interaction.guild;
    let tUser = interaction.user;
    let channelName = `ticket-${tUser.username}-wl`;
    let role = server.roles.cache.find(r => r.name == "STAFF");    
    let findChannel = server.channels.cache.find(c => c.name == channelName);

    if(findChannel){
        await i.reply({ content: "Tev jau ir izveidots tickets!", ephemeral: true })
        return;
    };

    if(i.user.id == "254296401700192257") return;
    
    server.channels.create(channelName, { reason: `${tUser.tag} izveidoja jaunu ticketu` }).then(async (channel) => {
        let category = server.channels.cache.find(c => c.id == "878957146165878815" && c.type == "GUILD_CATEGORY");
        
        let justCreatedEm = new MessageEmbed()
        .setColor(bot.colors.yellow)
        .setDescription(`Sveicināts <@${tUser.id}>, kāds no administrācijas drīz ieradīsies, lai tev palīdzētu!
        Kamēr gaidi, apraksti savu problēmu.`)
        .setFooter(server.name, server.iconURL())
        .setTimestamp(new Date());

        let row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('deleteticket')
            .setLabel('Izdzēst ticketu')
            .setStyle('DANGER')
            .setEmoji('⛔'),
        );
        
        channel.setParent(category.id);
        channel.permissionOverwrites.set([
            { 
                id: tUser.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            },
            { 
                id: role.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            },
            {
                id: channel.guild.roles.everyone,
                deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            }
        ]);
        channel.send({ content: `<@${tUser.id}>`, embeds: [justCreatedEm], components: [row] })
        await i.reply({ content: `Tavs tickets tika izveidots! <#${channel.id}>`, ephemeral: true })

        let openTicketEmbedWL = new MessageEmbed()
        .setColor(bot.colors.yellow)
        .setAuthor("Jauns tickets", "https://i.ibb.co/GcVJ2zr/arcane.png")
        .addField("Tickets:", `\`${channel.name}\``, true)
        .addField("Atvēra:", `<@${tUser.id}>`, true)
        .addField("Tips:", `WL`, false)
        .setFooter("Arcane.lv", "https://i.ibb.co/GcVJ2zr/arcane.png")
        .setTimestamp(new Date());
        sendTicketLog(i, openTicketEmbedWL, dcModId);
    }).catch(console.error);
};
async function createTicketIP(interaction, bot){
    let i = interaction;
    let server = interaction.guild;
    let tUser = interaction.user;
    let channelName = `ticket-${tUser.username}-ip`;
    let role = server.roles.cache.find(r => r.name == "STAFF");    
    let adminRole = server.roles.cache.find(r => r.name == "Admin");
    let findChannel = server.channels.cache.find(c => c.name == channelName);

    if(findChannel){
        await i.reply({ content: "Tev jau ir izveidots tickets!", ephemeral: true })
        return;
    };

    if(i.user.id == "254296401700192257") return;
    
    server.channels.create(channelName, { reason: `${tUser.tag} izveidoja jaunu ticketu` }).then(async (channel) => {
        let category = server.channels.cache.find(c => c.id == "878768875569831976" && c.type == "GUILD_CATEGORY");
        
        let justCreatedEm = new MessageEmbed()
        .setColor(bot.colors.yellow)
        .setDescription(stripIndents`Sveicināts <@${tUser.id}>, kāds no administrācijas drīz ieradīsies, lai tev palīdzētu!
        Kamēr gaidi, apraksti savu problēmu.
        Savu IP adresi var atrast [**šeit**](https://whatismyipaddress.com).`)
        .setFooter(server.name, server.iconURL())
        .setTimestamp(new Date());
        
        let row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('deleteticket')
            .setLabel('Izdzēst ticketu')
            .setStyle('DANGER')
            .setEmoji('⛔'),
        );
            
        channel.setParent(category.id);
        channel.permissionOverwrites.set([
            { 
                id: tUser.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            },
            { 
                id: role.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            },
            {
                id: channel.guild.roles.everyone,
                deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            }
        ]);
        channel.send({ content: `<@${tUser.id}>, <@&${adminRole.id}>`, embeds: [justCreatedEm], components: [row] })
        await i.reply({ content: `Tavs tickets tika izveidots! <#${channel.id}>`, ephemeral: true })

        let openTicketEmbedIP = new MessageEmbed()
        .setColor(bot.colors.yellow)
        .setAuthor("Jauns tickets", "https://i.ibb.co/GcVJ2zr/arcane.png")
        .addField("Tickets:", `\`${channel.name}\``, true)
        .addField("Atvēra:", `<@${tUser.id}>`, true)
        .addField("Tips:", `IP`, false)
        .setFooter("Arcane.lv", "https://i.ibb.co/GcVJ2zr/arcane.png")
        .setTimestamp(new Date());
        sendTicketLog(i, openTicketEmbedIP, dcModId);
    }).catch(console.error);
};

async function deleteTicket(interaction, bot){
    let i = interaction;
    let tUser = i.user;

    let closeTicketEmbed = new MessageEmbed()
    .setColor(bot.colors.red)
    .setAuthor("Aizslēgts tickets", "https://i.ibb.co/GcVJ2zr/arcane.png")
    .addField("Tickets:", `\`${i.channel.name}\``)
    .addField("Slēdzējs:", `<@${tUser.id}>`)
    .setFooter("Arcane.lv", "https://i.ibb.co/GcVJ2zr/arcane.png")
    .setTimestamp(new Date());
    sendTicketLog(i, closeTicketEmbed, dcModId);

    let waitEmbed = new MessageEmbed()
    .setColor(bot.colors.red)
    .setDescription("Šis tickets, tiks izdzēsts pēc dažām sekundēm!")
    .setFooter(`${tUser.username}`, tUser.displayAvatarURL())
    .setTimestamp(new Date());

    i.channel.send({ embeds: [waitEmbed] })
    await i.update({ components: [] })
    await bot.wait(3050)
    await i.channel.delete()
};

module.exports = {
    createTicketWL,
    createTicketIP,
    deleteTicket
};