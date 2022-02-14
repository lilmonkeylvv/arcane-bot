module.exports = async (bot, warn) => {
    bot.logger.log('warn', warn.stack);
    const monkey = bot.users.cache.get(bot.ownerId);
    monkey.send({ content: `Warning: \`\`\`${warn.stack}\`\`\`` });
};