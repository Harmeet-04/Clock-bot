// test-bot.js
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Create client with required intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
});

client.once('ready', () => {
    console.log(`✅ Test Bot is ready as ${client.user.tag}`);
});

client.on('messageCreate', message => {
    console.log(`📩 Message received: "${message.content}" from ${message.author.tag}`);
    if (message.author.bot) return;
    message.reply("✅ I received your message!");
});

client.login(process.env.DISCORD_TOKEN);
