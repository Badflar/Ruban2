const Discord = require("discord.js");
const { prefix } = require('../../config.json')
const { readdirSync } = require('fs')
const { stripIndents } = require('common-tags')

module.exports = {
    config: {
        name: "help",
        aliases: ["h", "how"],
        usage: "{command}",
        category: "Info",
        description: "Get all commands that Ruban has.",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        const embed = new Discord.RichEmbed()
            .setColor("RED")
            .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL)
            .setThumbnail(bot.user.displayAvatarURL);

        if (!args[0]) {
            const categories = readdirSync("./commands");
            console.log(categories);

            embed.setDescription(`Here are the avaliable commands for ${message.guild.me.displayName}\n` +
                                `The bot prefix is: **${prefix}**\n` + 
                                'To get more info about a specific command, do \`;r {command}\` to get more info');
            embed.setFooter(`${message.guild.me.displayName} | Total Commands ${bot.commands.size}`, bot.user.displayAvatarURL);

            categories.forEach(category => {
                const dir = bot.commands.filter(c => c.config.category === category);
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);
                try {
                    embed.addField(`❯ ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\` - ${c.config.description}\n`).join(" "))
                } catch(e) {
                    console.log(e);
                }
            })

            return message.channel.send(embed);
        } else {
            let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if(!command) return message.channel.send(embed.setTitle("Invalid Command!").setDescription(`Do \`${prefix}help\' for the list of commands.`).setColor("ORANGE"))
            command = command.config

            embed.setDescription(stripIndents`The bot's prefix is: \'${prefix}\'\n
            **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Aliases:** ${command.aliases ? command.aliases.join(" ") : "No Aliases"}
            **Description:** ${command.description || "No description provide"}
            **Usage:** ${command.usage ? `\'${prefix}${command.name} ${command.usage}\'` : "No Usage"}
            **Accessible By:** ${command.accessableby || "Members"}`);

            return message.channel.send(embed);
        }
    }
}
