// Help
function handlehelpCommands(message) {
    const msg = message.content.toLowerCase();
    if (msg === '!help') {
        return message.reply(
            "**Commands:**\n" +
            "`!ping` - Test bot response\n" +
            "`!punch [@user(s)]` - Punch one or more users\n" +
            "`!hug [@user(s)]` - Hug one or more users\n" +
            "`!poke [@user(s)]` - Poke one or more users\n" +
            "`!love [@user(s)]` - Send love to one or more users\n" +
            "`!server` - Show server info\n" +
            "`!time <region / member>` - Show time for a specific region or member\n"
        );
    }
}

module.exports={handlehelpCommands};