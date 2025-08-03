require('dotenv').config();
const express = require('express');
const app = express();
const { Client, GatewayIntentBits } = require('discord.js');
const moment = require('moment-timezone');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const regions = {
  asia: 'Asia/Kolkata',
  singapore: 'Asia/Singapore',
  japan: 'Asia/Tokyo',
  eu: 'Europe/Berlin',
  london: 'Europe/London',
  na: 'America/New_York',
  la: 'America/Los_Angeles',
  cst: 'America/Chicago',
};

function getTimes() {
  let msg = '**Current Times:**\n';
  for (const [name, zone] of Object.entries(regions)) {
    msg += `**${name.toUpperCase()}**: ${moment().tz(zone).format('hh:mm A')} (${zone})\n`;
  }
  return msg;
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  console.log('Bot is online');
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();

  if (content === '!timezones' || content === '!times') {
    message.channel.send(getTimes());
  }

  if (content.startsWith('!time ')) {
    const region = content.split(' ')[1];
    const zone = regions[region];

    if (!zone) {
      message.channel.send(`Unknown region: ${region}`);
    } else {
      const time = moment().tz(zone).format('hh:mm A');
      message.channel.send(`**${region.toUpperCase()}** time: ${time} (${zone})`);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(3000, () => console.log('Uptime web server running'));