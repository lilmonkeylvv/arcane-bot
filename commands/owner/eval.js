module.exports.run = async (bot, message, args) => {
    message.delete();
    
    if(message.author.id != bot.ownerId) return message.channel.send({ content: `<@${message.author.id}>, tev nav pieeju šādai darbībai!` }).then(m => { setTimeout(() => m.delete(), 10000)});

    var code = args.join(" ");
    if (code.toLowerCase().includes(`token`)) return message.channel.send({ content: `|| pis nah \;) ||` }).then(m => { setTimeout(() => m.delete(), 10000)});
    var evaled = eval(code);
    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
};

module.exports.config = {
    name: "eval"
};