const { Client, Collection } = require('discord.js');
const { prefix, token } = require('./config.json');
const bot = new Client();

bot.commands = new Collection();
bot.aliases = new Collection();

["commands", "aliases"].forEach(x => bot[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

let y = process.openStdin()
y.addListener("data", res => {
    let x = res.toString().split(/ +/g);
    let channel = x[0].toString();
    x.shift();
    bot.channels.get(channel).send(Array.prototype.join.call(x, " "));
})

bot.on('ready', async () => {
    console.log(`Bot is ready! ${bot.user.username}`);

    let statuses = [
        `${bot.guilds.size} guilds!`,
        `;r help`,
        `over ${bot.users.size} users!`,
        'Now on AWS and GitHub!',
        'Woof!!'
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];  
        bot.user.setActivity(status, {type: "WATCHING"});
    }, 6000)

    try {
        link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch(e) {
        console.log(e.stack);
    }
});

bot.login(token);