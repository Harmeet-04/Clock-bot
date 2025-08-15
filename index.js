const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const express = require('express');
const app = express();

// Import feature handlers
const { handleTimezonesCommand } = require('./features/clock');
const { handleFunCommands } = require('./features/fun');
const { handlehelpCommands } = require('./features/help');

// Create bot client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

// Log when bot is ready
client.once('ready', () => {
    console.log(`🤖 Logged in as ${client.user.tag} on PID ${process.pid}`);
});

// Handle disconnects/reconnects
client.on('shardDisconnect', (event, shardId) => {
    console.warn(`⚠️ Shard ${shardId} disconnected (Code ${event.code})`);
});
client.on('shardReconnecting', shardId => {
    console.log(`🔄 Shard ${shardId} reconnecting...`);
});
client.on('shardError', (error, shardId) => {
    console.error(`💥 Shard ${shardId} error:`, error);
});

// Message handler
client.on('messageCreate', async (message) => {
    console.log(`📩 Received message: "${message.content}" from ${message.author.tag}`);

    // If bot or DM, ignore
    if (message.author.bot || !message.guild) return;

    try {
        handlehelpCommands(message);
    } catch (err) {
        console.error("❌ Help command error:", err);
    }

    try {
        handleTimezonesCommand(message);
    } catch (err) {
        console.error("❌ Clock command error:", err);
    }

    try {
        handleFunCommands(message);
    } catch (err) {
        console.error("❌ Fun command error:", err);
    }
});


// Force daily restart to keep connection fresh
setInterval(() => {
    console.log("🔄 Restarting bot to refresh connection...");
    process.exit(0); // Render will auto-restart
}, 24 * 60 * 60 * 1000); // Every 24 hours

// Heartbeat log every 5 mins
setInterval(() => {
    console.log("💓 Bot heartbeat:", new Date().toISOString());
}, 5 * 60 * 1000);

// Login
client.login(process.env.DISCORD_TOKEN);

// UptimeRobot ping route
app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(3000, () => console.log('🌐 Uptime web server running'));