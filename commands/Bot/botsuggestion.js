const Discord = require("discord.js"); 
var DatabaseHanlder = require('../../handlers/database');

module.exports = {
    config: {
        name: "botsuggestion",
        aliases: ["bs", "botsugg"],
        usage: "{suggestion}",
        category: "Bot",
        description: "Send a suggestion to add or change about Foxley",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        DatabaseHanlder.InsertBotSuggestion(message, args);
        message.channel.send("Your suggestion has been added and will be addressed soon");
    }
}
