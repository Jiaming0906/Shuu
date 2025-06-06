// things to do on discord.com/developers/applications
// 1. create an application
// 2. avatar
// 3. bot, then add bot
// 4. reset token, add token to .env
// 5. message content intent turn on 
// 6. OAuth2, custom URL
//https://discord.com/oauth2/authorize?scope=bot&permissions=8&client_id=1071980540837765320

//create a discord bot
require('dotenv').config();
//npm i dotenv
//npm i discord.js

//define
const { EmbedBuilder } = require("discord.js");
const dotenv = require("dotenv");
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, Partials, ActivityType, PermissionsBitField } = require('discord.js');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessageReactions
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.Reaction,
        Partials.User
    ]
});

//commands path
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
};

//events path
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
};

//welcome message

//commands interaction
// client.once(Events.ClientReady, () => {
//     console.log("Ready to accept commands!");
// });

// //commands interaction
// client.on(Events.InteractionCreate, async interaction => {
//     if (!interaction.isChatInputCommand()) return;

//     const command = client.commands.get(interaction.commandName);

//     if (!command) return;

//     try {
//         await command.execute(interaction);

//     } catch (err){
//         console.log("index.js, client.on Events.InteractionCreate");
//         console.log("err message below".padEnd(50, "-"));
//         console.log(err);
//         console.log("-".padEnd(50, "-"));

//         await interaction.reply({
//             content: "Error. Please use the command in the server."
//         })
//     }
// });

//DM bot
//bot message channel
//recieve dm message reports
//reaction add
//reaction remove 

// log bot onto discord

// client.on('ready', async (c) => {
//     console.log("Assistant is Online on Discord");
//     const currentTime = new Date();
//     console.log(`${currentTime}`);

//     //activitytype set 
//     client.user.setActivity({
//         name: "BOSS",
//         type: ActivityType.Listening,
//     });
//     console.log("-".padEnd(50, "-"));
// });

client.login(process.env.DISCORD_TOKEN);

//node .\index.js
//"start": "node bot.js"
//
