const DatabaseHanlder = require("../../handlers/database");

module.exports = {
    config: {
        name: "muterole",
        aliases: ["setmuterole", "muterole"],
        usage: "{RoleId}",
        category: "Mute",
        description: "Set the role that mutes users",
        accessableby: "Manage Roles" 
    },
    run: async (bot, message, args) => {
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Sorry, you do not have permission to do this.");


        var id = args.join("");
        var isnum = /^\d+$/.test(id);
        if (!isnum) return message.channel.send("Your role id contains letters. Please make sure that you right click the mute role and do `Copy Id`");
        
        var role = message.guild.roles.find("id", id);
        if (!role) return message.channel.send("I could not find that role. Please make sure that you right click the mute role and do `Copy Id`");

        DatabaseHanlder.SetMuteRole(message, args);

        return message.channel.send(`I have set the role ${role.name} as the server's mute role.`)
    }
}
    