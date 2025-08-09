const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Import feature handlers
const { handleTimezonesCommand } = require('./features/clock');
const { handleFunCommands } = require('./features/fun');
const { handlehelpCommands }= require('./features/help')

// Create bot client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

client.once('ready', () => {
    console.log(`🤖 Logged in as ${client.user.tag} on PID ${process.pid}`);

});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;

    const content = message.content.trim();

    // Handle features
    handlehelpCommands(message);
    handleTimezonesCommand(message);
    handleFunCommands(message);
});

client.login(process.env.DISCORD_TOKEN);