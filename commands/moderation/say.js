module.exports.run = async (bot, message, args) => {
       message.delete();

       if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send({ content: `<@${message.author.id}>, tev nav pieeju šādai darbībai!` }).then(m => { setTimeout(() => m.delete(), 150000)});
       let mChannel = message.mentions.channels.first();

       if(mChannel){
              args = args.slice(1).join(" ");
              mChannel.send({ content: args });
       } else {
              args = args.join(" ");
              message.channel.send({ content: args });
       };
};

module.exports.config = {
       name: "say",
       aliases: ["announce"],
       category: "moderation",
       usage: "say (#Channel) <Message>",
       description: "Aizsūta paziņojumu, noteiktajā kanālā"
};