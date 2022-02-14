module.exports = async (bot, error) => {
    bot.logger.log('error', error.stack);
    const monkey = bot.users.cache.get(bot.ownerId);
    monkey.send({ content: `Error: \`\`\`${error.stack}\`\`\`` });
};