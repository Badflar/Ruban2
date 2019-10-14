const { prefix } = require("../../config.json");

module.exports = async (bot, message) => {
    if(message.author.bot || message.channel.type === "dm") return;

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if(!message.content.startsWith(prefix)) return;
    let commandFile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
    if(commandFile) commandFile.run(bot, message, args);
}
