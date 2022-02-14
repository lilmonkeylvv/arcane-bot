const cp = require('child_process');

module.exports.run = async (bot, message, args) => {
    message.delete();
    
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: `<@${message.author.id}>, tev nav pieeju šādai darbībai!` }).then(m => { setTimeout(() => m.delete(), 10000)});
    
    let argList = args[0];
    if(!argList) return message.channel.send({ content: `<@${message.author.id}>, norādi IP adresi!` }).then(m => { setTimeout(() => m.delete(), 10000)});
    
    cp.exec(`sudo iptables -A INPUT -s ${argList} -j ACCEPT`, function(err, stdout, stderr){
        if(!err){
            message.channel.send({ content: `<@${message.author.id}>, IP tika pievienots!` }).then(m => { setTimeout(() => m.delete(), 2500)});
        } else {
            new Error(err);
        };
    });
};

module.exports.config = {
    name: "addip",
    aliases: ["ipadd"],
    category: "moderation",
    description: "Pievieno noteikto IP pie sistēmas",
    usage: "addip <IP>"
};