module.exports.run = async (bot, message, args) => {
       message.delete();
       let member = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]) || bot.users.cache.get(args[0]);
       if(message.author.id != message.guild.ownerId) return message.channel.send({ content: `<@${message.author.id}>, tev nav pieeju šādai darbībai!` }).then(m => { setTimeout(() => m.delete(), 10000)});

       const msg = args.slice(1).join(" ");
       if(!msg) return message.channel.send({ content: `<@${message.author.id}>, norādi ziņu!` }).then(m => { setTimeout(() => m.delete(), 10000)});
       member.send({ content: msg }).catch(err => {});
};

module.exports.config = {
       name: "pm",
       aliases: ["pmone"]
};