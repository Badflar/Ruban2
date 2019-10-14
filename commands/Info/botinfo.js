const Discord = require("discord.js")

module.exports = {
    config: {
        name: "guildinfo",
        aliases: ["gi", "guilddesc"],
        usage: "",
        category: "Info",
        description: "Get infomation about Ruban",
        accessableby: "Members"
    },    
    run: async (bot, message, args) => {
        let thumbnail = bot.user.displayAvatarURL;

        let embed = new Discord.RichEmbed()
        .setThumbnail(thumbnail)
        .setTitle("Ruban's Infomation")
        .setColor('DARK_RED')
        .addField("Description", "A mod-focused Discord Bot created by Badflar")
        .addField("Misc Info", 
                `Created On: **${client.user.createdAt}`)
        .addField("Invite", "https://discordapp.com/oauth2/authorize?client_id=402569572101783552&permissions=8&scope=bot \n" +
                            "*Please note this bot is still in development and many things may be incomplete, change randomly, or not implimented at all.*")
        .setFooter("Creator: Badflar || Foxley")  

        message.channel.send(embed);

        return;
    }

}