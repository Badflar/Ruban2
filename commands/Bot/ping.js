const Discord = require("discord.js");

module.exports = {
    config: {
        name: "ping",
        aliases: ["pi", "responseTime"],
        usage: "",
        category: "Bot",
        description: "Test the latency delay of Ruban",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        const msg = await message.channel.send(':ping_pong: Pinging...');

        msg.edit(`:ping_pong: Pong!\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency is ${Math.round(bot.ping)}ms`);

        return;
    }
}
