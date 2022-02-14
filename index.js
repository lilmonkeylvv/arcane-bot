const { Client, Collection } = require("discord.js");
const startLogger = require('./functions/cleanups/loggerFunctions');
const consoleCmds = require('./functions/cleanups/consoleFunctions');
const bot = new Client({ 
    partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION'],
    intents: 32767,
});

/* Configs */
bot.ownerId = "286540906335830017"; // Register dev ID
bot.config = require('./configs/config.json'); // Register config
bot.colors = require('./configs/colors.json'); // Register colors
bot.wait = require('util').promisify(setTimeout); // Register the wait function
bot.print = console.log; // Register a easier console log
bot.allowedLinks = [ // Register link whitelist
    "https://discord.com",
    "https://discord.gg",
    "https://support.discord.com",
    "https://cdn.discordapp.com",
    "https://media.discordapp.net",
    "https://imgur.com",
    "https://tenor.com",
    "https://twitch.tv",
    "https://www.twitch.tv",
    "https://clips.twitch.tv",
    "https://streamable.com",
    "https://youtube.com",
    "https://youtu.be",
    "https://www.youtube.com",
    "https://www.gta5-mods.com",
    "https://gta5-mods.com",
    "https://prnt.sc",
    "https://fivem-store.com",
    "https://forum.cfx.re",
    "https://media.giphy.com",
    "https://soundcloud.com",
    "https://www.reddit.com",
    "https://reddit.com",
    "https://open.spotify.com",
    "http://arcane.lv"
];

/* Starters */
startLogger(bot); // Start winston logger
consoleCmds(bot); // Enable console command functionality

/* Load commands/events */
["aliases", "commands"].forEach(x => bot[x] = new Collection()); // Load commands
["command", "event", "process"].forEach(x => require(`./handlers/${x}`)(bot)); // Load events

/* Login */
bot.login(bot.config.token); // Login