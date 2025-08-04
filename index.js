require('dotenv').config();
const express = require('express');
const app = express();
const { Client, GatewayIntentBits } = require('discord.js');
const moment = require('moment-timezone');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// List of region codes and time zones
const entries = [
  ['ASIA', 'Asia/Kolkata'],
  ['EU', 'Europe/Berlin'],
  ['UK', 'Europe/London'],
  ['NYC', 'America/New_York'],
  ['LA', 'America/Los_Angeles'],
  ['CHICAGO', 'America/Chicago'],
  ['TORONTO', 'America/Toronto'],
  ['VANCOUVER', 'America/Vancouver'],

  // India
  ['INNOCENT', 'Asia/Kolkata'],
  ['MAYON', 'Asia/Kolkata'],
  ['KREJIL', 'Asia/Kolkata'],
  ['INFERNIUS', 'Asia/Kolkata'],
  ['PHANTOM', 'Asia/Kolkata'],
  ['PLURK', 'Asia/Kolkata'],
  ['VANSH', 'Asia/Kolkata'],
  ['DANA', 'Asia/Kolkata'],
  ['GLITCH', 'Asia/Kolkata'],
  ['CHROME', 'Asia/Kolkata'],
  ['FATHOMICS', 'Asia/Kolkata'],
  ['WEI', 'Asia/Kolkata'],

  // Europe
  ['15', 'Europe/London'],
  ['NEON', 'Europe/Amsterdam'],
  ['NANACHI', 'Europe/Brussels'],
  
  // America
  ['TRG', 'America/Toronto'],
  ['BOZOLORD', 'America/New_York'],
  ['FLAME', 'America/Chicago'],
  ['PNWB', 'America/New_York'],
];

// Format all time zones for "!times" or "!timezones"
function getTimes() {
  let msg = '```';
  msg += `Current Times:\n\n`;
  for (const [name, zone] of entries) {
    const time = moment().tz(zone).format('hh:mm A');
    msg += `${name.padEnd(12)}: ${time}  (${zone})\n`;
  }
  msg += '```';
  return msg;
}

// Bot online
client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Message handling
client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();

  // Command to show all time zones
  if (content === '!timezones') {
    const requiredRoleName = 'Moderator'; // Change this to your actual role name
    const hasRole = message.member.roles.cache.some(role => role.name === requiredRoleName);

    if (!hasRole) {
      return message.reply(`❌ You don't have permission to use this command.`);
    }

    // If user has role, send the timezones
    return message.channel.send(getTimes());
  }

  // Command to show time of specific region
  if (content.startsWith('!time ')) {
    const regionInput = content.split(' ')[1].toUpperCase();
    const match = entries.find(([name]) => name === regionInput);

    if (!match) {
      message.channel.send(`❌ Unknown region: ${regionInput}`);
    } else {
      const [name, zone] = match;
      const time = moment().tz(zone).format('hh:mm A');
      message.channel.send(`**${name}** time: ${time} (${zone})`);
    }
  }
});

// Start bot using token
client.login(process.env.DISCORD_TOKEN);

// Keep-alive Express server (Replit + UptimeRobot)
app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(3000, () => console.log('🌐 Uptime web server running on port 3000'));