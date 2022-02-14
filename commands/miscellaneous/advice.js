const request = require('superagent');

module.exports.run = async (bot, message, args) => {
    message.delete();

    request.get('http://api.adviceslip.com/advice').end((err, res) => {
        if (!err && res.status === 200) {
            try {
                JSON.parse(res.text)
            } catch (e){
                return message.channel.send({ content: `<@${message.author.id}>, notika API problēma!` }).then(m => { setTimeout(() => m.delete(), 1500)});
            };
            const advice = JSON.parse(res.text);
            message.channel.send({ content: advice.slip.advice }).then(m => { setTimeout(() => m.delete(), 150000)});
        } else {
            new Error(`REST call failed: ${err}, status code: ${res.status}`);
        };
    });
};

module.exports.config = {
    name: "advice",
    aliases: ["padoms"],
    category: "miscellaneous",
    usage: "advice",
    description: "Padoms"
};