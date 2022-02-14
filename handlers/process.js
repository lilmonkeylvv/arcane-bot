const { readdirSync } = require('fs');
const process = require('process');

module.exports = (bot) => {
    const processes = readdirSync('./events/process').filter(file => file.endsWith('.js'));
    for (const file of processes){
        const event = require(`../events/process/${file}`);
        let eName = file.split('.')[0];
        try {
            process.on(eName, event.bind(null, bot));
        } catch(error) {
            console.error(error);
        };
    };
};