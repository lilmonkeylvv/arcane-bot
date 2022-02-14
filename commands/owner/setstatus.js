const readyFunctions = require('../../functions/cleanups/readyFunctions');

module.exports.run = async (bot, message, args) => {
    message.delete();
    
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: `<@${message.author.id}>, tev nav pieeju šādai darbībai!` }).then(m => { setTimeout(() => m.delete(), 10000)});

    let type = args[0];
    let status = args.slice(1).join(" ");

    if(type != "reset"){
        if(type == "PLAYING" || type == "STREAMING" || type == "LISTENING" || type == "WATCHING"){
            bot.user.setActivity(status, { type: type });
            await message.channel.send({ content: `<@${message.author.id}>, statuss - **${status}**, tips - **${type}**!` }).then(m => { setTimeout(() => m.delete(), 10000)});
        } else {
            return;
        };
    } else {
        readyFunctions.setStatuses(bot)
        message.channel.send({ content: `<@${message.author.id}>, statuss **atiestatīts**.` }).then(m => { setTimeout(() => m.delete(), 10000)});
    };
};

module.exports.config = {
    name: "setstatus",
    aliases: ["newstatus"]
};