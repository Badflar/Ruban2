const { readdirSync } = require("fs");

module.exports = (bot) => {
    const load = dirs => {
        const commands = readdirSync(`./commands/${dirs}`).filter(d => d.endsWith(`.js`));
        for (let file of commands) {
            const pull = require(`../commands/${dirs}/${file}`)
            bot.commands.set(pull.config.name, pull);
            if(pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name));
        }
    }
    ["Ban", "Kick", "Mute", "Report", "Info", "Bot"].forEach(x => load(x));
}