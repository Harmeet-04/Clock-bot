const punchGifs = require('./punch.json');
const hugGifs = require('./hug.json');
const pokeGifs = require('./poke.json');
const loveGifs = require('./love.json');

function handleFunCommands(message) {
    const msg = message.content.toLowerCase();

    // Ping
    if (msg === '!ping') {
        return message.reply('🏓 Pong!');
    }

    // Action commands
    if (msg.startsWith('!punch')) {
        return sendGifCommand(message, punchGifs, "👊", ["punched", "smacked", "hit"]);
    }
    if (msg.startsWith('!hug')) {
        return sendGifCommand(message, hugGifs, "🤗", ["hugged", "embraced"]);
    }
    if (msg.startsWith('!poke')) {
        return sendGifCommand(message, pokeGifs, "👉", ["poked", "tapped", "prodded"]);
    }
    if (msg.startsWith('!love')) {
        return sendGifCommand(message, loveGifs, "❤️", ["sent love to", "showed love to", "shared hearts with"]);
    }

    // Server info
    if (msg === '!server') {
        return message.reply(`📌 Server name: **${message.guild.name}**\n👥 Members: **${message.guild.memberCount}**`);
    }
}

// Helper function for action GIFs
function sendGifCommand(message, gifArray, emoji, actionVariations, isSelfOnly = false) {
    const mentionedUsers = message.mentions.users;
    const randomGif = gifArray[Math.floor(Math.random() * gifArray.length)];
    const randomAction = actionVariations[Math.floor(Math.random() * actionVariations.length)];

    if (mentionedUsers.size > 0 && !isSelfOnly) {
        const mentionsList = Array.from(mentionedUsers.values())
            .map(user => `<@${user.id}>`)
            .join(', ');
        return message.channel.send(`${emoji} **<@${message.author.id}>** ${randomAction} **${mentionsList}**!\n${randomGif}`);
    } else {
        return message.channel.send(`${emoji} **<@${message.author.id}>** ${randomAction}!\n${randomGif}`);
    }
}

module.exports = { handleFunCommands };