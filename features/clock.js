const moment = require('moment-timezone');

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
    ['Malovent', 'Asia/Kolkata'],

    // Europe
    ['15', 'Europe/London'],
    ['NEON', 'Europe/Amsterdam'],
    // ['NANACHI', 'Europe/Brussels'],

    // America
    ['TRG', 'America/Toronto'],
    ['BOZO', 'America/New_York'],
    ['FLAME', 'America/Chicago'],
    ['PNBW', 'America/New_York'],
    ['VAYZEN', 'America/Edmonton'],
];

// 🔧 Get time string
function formatTime(name, zone) {
    const time = moment().tz(zone).format('hh:mm A');
    return `${name.padEnd(12)}: ${time}  (${zone})`;
}

// 🔧 Show all times
function getTimes() {
    let msg = '```Current Times:\n\n';
    for (const [name, zone] of entries) {
        msg += formatTime(name, zone) + '\n';
    }
    msg += '```';
    return msg;
}

// 📦 Main handler
function handleTimezonesCommand(message) {
    const content = message.content.trim().toLowerCase();

    // !timezones
    if (content === '!timezones') {
        const isMod = message.member.roles.cache.some(r => r.name === "Moderator"); // role-based
    
        if (!isMod) {
            message.reply("⛔ You don’t have permission to use `!timezones`.");
            return;
        }
        message.channel.send(getTimes());
        return;
    }
    
    // !time
    if (content.startsWith('!time')) {
        const parts = content.split(' ');
        if (parts.length === 1) {
            message.channel.send("Please specify a region or member: `!time <region / member>`");
            return;
        }

        const input = parts[1].toUpperCase();

        // Exact region/name match
        const match = entries.find(([name]) => name === input);
        if (match) {
            const [name, zone] = match;
            const time = moment().tz(zone).format('hh:mm A');
            message.channel.send(`**${name}** time: ${time} (${zone})`);
            return;
        }
    }
}

module.exports = { handleTimezonesCommand };