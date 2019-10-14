const Discord = require("discord.js")

module.exports = {
    config: {
        name: "kick",
        aliases: ["kickuser", "kickmember"],
        usage: "{User} {?Reason}",
        category: "Kick",
        description: "Kick a user from the server",
        accessableby: "Admins" 
    },
    run: async (bot, message, args) => {
        let mention = message.mention.first;
        
        if(!mention) return message.channel.send(`${message.author.username}, you must tag the member you want to kick! Or I might've not been able to find them...`);
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("I know you might have a grudge but you do not have permission to do this.")

        let sUser = message.guild.me.highestRole.position;
        let kUser = mention.highestRole.position;
        if(sUser <= kUser) return message.channel.send("You can't kick someone who has higher power than you.");

        let reason = args.join(" ").slice(22);

        let embed = new Discord.RichEmbed()
        .setTitle("~Kick~")
        .setColor("ORANGE")
        .addField("Kicked User", `${mention} with ID ${mention.id}`)
        .addField("Kicked By", `${message.author} with ID ${message.author.id}`)
        .addField("Kicked In", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", reason);

        message.guild.member(mention).kick(reason);

        let eventChannel = message.guild.channels.find(x => x.name === "events");
        if(!eventChannel) message.channel.send("Sorry, but I could not find the admin event channel but I kicked that member anyways. Info can be found in the audit logs.")
        else message.channel.send(`Taken care of ${message.author}! You can find the log in the event channel.`);

        eventChannel.send(embed);

        return
    }

}