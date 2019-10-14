const Discord = require("discord.js")

module.exports = {
    config: {
        name: "ban",
        aliases: ["banuser", "bammember"],
        usage: "{User} {?Reason}",
        category: "Ban",
        description: "Ban a user from the server",
        accessableby: "Admin"
    },
    run: async (bot, message, args) => {
        let mention = message.mention.first;

        if(!mention) return message.channel.send(`${message.author.username}, you must tag the member you want to ban! Or I might've not been able to find them...`);
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("This is a big action and I don't think you have the right permission to do so...");

        let sUser = message.guild.me.highestRole.position;
        let bUser = mention.highestRole.position;
        if(sUser <= bUser) return message.channel.send("You can't ban someone who has higher power than you.");

        let reason = args.join(" ").slice(22);

        let embed = new Discord.RichEmbed()
        .setTitle("~Ban~")
        .setColor("RED")
        .addField("Banned User", `${mention} with ID ${mention.id}`)
        .addField("Banned By", `${message.author} with ID ${message.author.id}`)
        .addField("Banned In", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", reason);

        message.guild.member(mention).ban(reason);

        let eventChannel = message.guild.channels.find(x => x.name === "events");
        if(!eventChannel) message.channel.send("Sorry, but I could not find the admin event channel but I banned that member anyways. Info can be found in the audit logs.")
        else message.channel.send(`Taken care of ${message.author}! You can find the log in the event channel.`);

        eventChannel.send(embed);

        return
    }
}