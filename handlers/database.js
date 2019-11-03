const Connection = require('tedious').Connection;
const Request = require('tedious').Request  
const TYPES = require('tedious').TYPES; 
const config = require("../config.json");

var dbConfig = {
    server: config.database.server,
    authentication: {
        type: config.database.authentication.type,
        options: {
            userName: config.database.authentication.options.userName,
            password: config.database.authentication.options.password
        }
    },
    options: {
        database: config.database.options.database
    }
  };

module.exports = {
    InsertBotSuggestion: function(message, args) {
        var connection = new Connection(dbConfig);
        connection.on('connect', function(err) {
            var request = new Request('usp_ins_BotSuggestion',
            function(err) {
                if (err) {
                    console.log(err);
                }
                connection.close();
            });
            
            var user = message.author;
            var suggestion = args.join(" ");

            request.addParameter('UserKey', TYPES.NVarChar, user.id);
            request.addParameter('Description', TYPES.NVarChar, suggestion);
            request.addParameter('TimeCreated', TYPES.DateTime, message.createdAt);
            connection.callProcedure(request);
        })
    },

    SetMuteRole: function (message, args) {
        var connection = new Connection(dbConfig);
        connection.on('connect', function(err) {
            var request = new Request('usp_upd_MuteRole',
            function(err) {
                if (err) {
                    console.log(err)
                }
                connection.close();
            });
            
            let guild = message.guild;
            let id = args.join("")

            request.addParameter('ServerId', TYPES.NVarChar, guild.id);
            request.addParameter('ServerName', TYPES.NVarChar, guild.name);
            request.addParameter('MuteRoleId', TYPES.NVarChar, id.toString());
            connection.callProcedure(request);
        })
    },

    InsertMute: function(message, args) {
        var connection = new Connection(dbConfig);
        connection.on('connect', function(err) {
            var request = new Request('usp_ins_Mute',
            function(err) {
                if (err) {
                    console.log(err)
                }
                connection.close();
            });
            
            let mention = message.mention.first;

            var isnum = /^\d+$/
            let timestampTest = isnum.test([args[0]])

            if (timestampTest) { 
                let timestamp = args.shift();
                let reason = args.join(" ").slice(22);

                request.addParameter('UserKey', TYPES.NVarChar, message.guild.member(mention).id);
                request.addParameter('ServerKey', TYPES.NVarChar, message.guild.id);
                request.addParameter('Reason', TYPES.NVarChar, reason);
                request.addParameter('TimeCreated', TYPES.NVarChar, message.createdAt);
                request.addParameter('IsExpireable', TYPES.Bit, 1);
                request.addParameter('TimeExpire', TYPES.DateTime, timestamp);
                connection.callProcedure(request);
            } else {
                let reason = args.join(" ").slice(22);
                
                request.addParameter('UserKey', TYPES.NVarChar, message.guild.member(mention).id);
                request.addParameter('ServerKey', TYPES.NVarChar, message.guild.id);
                request.addParameter('Reason', TYPES.NVarChar, reason);
                request.addParameter('TimeCreated', TYPES.NVarChar, message.createdAt);
                connection.callProcedure(request);
            }

            
        })
    }
};