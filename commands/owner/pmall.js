module.exports.run = async (bot, message, args) => {
       message.delete();

       if(message.author.id != message.guild.ownerId) return message.channel.send({ content: `<@${message.author.id}>, tev nav pieeju šādai darbībai!` }).then(m => { setTimeout(() => m.delete(), 10000)});

       const guildid = message.guild.id;
       const msg = args[0].join(" ");
       const list = bot.guilds.cache.get(guildid);
       
       if(!msg) return message.channel.send({ content: `<@${message.author.id}>, norādi ziņu!` }).then(m => { setTimeout(() => m.delete(), 1500)});

       list.members.cache.forEach(member => member.send({ content: msg })).catch(err => {});
};

module.exports.config = {
       name: "pmall",
       aliases: ["pall"]
};