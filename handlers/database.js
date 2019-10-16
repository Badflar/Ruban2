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

            request.addParameter('UserId', TYPES.NVarChar, user.id);
            request.addParameter('Description', TYPES.NVarChar, suggestion);
            request.addParameter('TimeCreated', TYPES.DateTime, message.createdAt);
            connection.callProcedure(request);
        })
    },
};