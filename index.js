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

//welcome message
const welcomeChannelId = "1176061415711318056";

client.on(Events.GuildMemberAdd, async (member) => {
    try {
        const a = ["H", "O", "W", "L", "h", "o", "w", "l", "A", "I", "R", "a", "i", "r", "."];
        if (a.includes(member.user.username[0])) {

            await client.channels.cache.get(welcomeChannelId).send(`Welcome to Laputa <@${member.id}>! Please read through the match-rules https://discord.com/channels/1176055204358139964/1176065449297981500 and collect your roles https://discord.com/channels/1176055204358139964/1176065391622115398 here. The sunset's breathtaking here, don't forget to catch it!`);

            const roleId = "1176056312300326940";
            let roleToAdd = await member.guild.roles.cache.get(roleId);
            await member.roles.add(roleToAdd);

        };

    } catch (err) {
        console.log("index.js, guildmemberadd, welcome message");
        console.log("error message below".padEnd(50, "-"));
        console.log(err)
        console.log("-".padEnd(50, "-"));
    };
});

//commands interaction
client.once(Events.ClientReady, () => {
    console.log("Ready to accept commands!");
});

//commands interaction
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (err){
        console.log("index.js, client.on Events.InteractionCreate");
        console.log("err message below".padEnd(50, "-"));
        console.log(err);
        console.log("-".padEnd(50, "-"));

        await interaction.reply({
            content: "Error. Please use the command in the server."
        })
    }
});

//DM bot

//bot message channel
const botMessageChannel = "1176068732599160902";
const botUserId = "<@1177117634207158312>";

//recieve dm message reports
client.on("messageCreate", async (message) => {

    //ignores if message was sent to guild
    if(message.guild) return;
    if(message.author.bot) return;

    try {
        //
        message.react("💟");

        //create embed
        const embed = new EmbedBuilder()
            .setColor("#8E7AF0")
            .setDescription(`From DM, <@${message.author.id}>:\n${message.content}`);
            
        //if got picture image in message
        // if (message.attachments.first()) {
        //     //console.log(message.attachments.first());
        //     await client.channels.cache.get(botMessageChannel).send(`From DM, ${message.author.username}:\n${message.content} (with photo attached)`);
        //     return;
        // };

        await client.channels.cache.get(botMessageChannel).send({ embeds: [embed] });
        return;

    } catch (err) {
        console.log("index.js, receive DM Message Error");
        console.log("err message below".padEnd(50, "-"));
        console.log(err);
        console.log("-".padEnd(50, "-"));
    };
});

//react to ready message
client.on("messageCreate", async (message) => {
    if (message.author.system) return;
    if (message.author.bot) return;

    if (message.content.startsWith("Ready") || message.content.startsWith("ready")) {
        message.react("☀️");
        return;
    };
});

//react to ping

client.on("messageCreate", async (message) => {
    
    if(message.author.bot) return;
    if(message.author.system) return;
    if(message.author.id === "697822391971086406") return;

    //console.log(message);

    try {
        //
        if(message.content.includes(botUserId)){
            message.react("💟");
            message.reply("Message received! I will get back to you soon!");

            //create an embed 
            const embed = new EmbedBuilder()
            .setColor("#FFBB91")
            .setDescription(`From Category _${message.channel.parent.name}_ > Channel _${message.channel.name}_, <@${message.author.id}>:\n${message.content}`);

            //if got picture image in message
            // if (message.attachments.first()) {
            //     //console.log(message.attachments.first());
            //     await client.channels.cache.get(botMessageChannel).send(`From ${message.channel.parent.name} > ${message.channel.name}, ${message.author.username}:\n${message.content} (with photo)`);
            //     return;
            // };
    
            //var messageLink = "https://discord.com/channels/" + String(message.guildId) + "/" + String(message.channelId) + "/" + String(message.id);
            await client.channels.cache.get(botMessageChannel).send({ embeds: [embed] });
            return;
        };

    } catch (err) {
        console.log("index.js, ping error");
        console.log("error message below".padEnd(50, "-"));
        console.log(err);
        console.log("-".padEnd(50, "-"));
    };
});

//reaction add

const reactionMessageId = "1164886437540405248";
const reactionLogChannelId = "1176068410841497650";

//roles to add
const rolesObj = {"🥶": "1164885298715578398", "😵‍💫": "1164885373164470303"};

client.on(Events.MessageReactionAdd, async (reaction, user) => {

    if (reaction.message.id === reactionMessageId) {
        //only triggers for reactions on reactionMessage only

        if (reaction.message.partial) {
            try {
                await reaction.message.fetch();
            } catch (err) {
                console.log("index.js, add roles, message partial");
                console.log("error message below".padEnd(50, "-"));
                console.log(err);
                console.log("-".padEnd(50, "-"));
            };
        };

        // const testonly = [];
        // reaction.message.reactions.cache.forEach(r => testonly.push(r))
        // console.log(testonly);
        
        if (rolesObj[reaction._emoji.name]) {
            try {
                let roleToAdd = await reaction.message.guild.roles.cache.get(rolesObj[reaction._emoji.name]);
                await reaction.message.guild.members.cache.get(user.id).roles.add(roleToAdd);

                //if custom emoji 
                if (reaction._emoji.id){
                    await client.channels.cache.get(reactionLogChannelId).send(`${user.username} reacted with <:${reaction._emoji.name}:${reaction._emoji.id}>, role "${roleToAdd.name}" has been given.`);
                    return;
                };
                await client.channels.cache.get(reactionLogChannelId).send(`${user.username} reacted with ${reaction._emoji.name}, role "${roleToAdd.name}" has been given.`);
                return;

            } catch (err) {
                // console.log(`${user.username} faced an error trying to add role with reaction`)
                // console.log("-".padEnd(39, "-"));
                console.log(err);
                console.log("-".padEnd(50, "-"));

                try {
                    //send error message to logs channel
                    await client.channels.cache.get(reactionLogChannelId).send(`🔴 ${user.username} needs help with adding role.`);

                } catch (err) {
                    console.log("error sending error to add role message to logs channel");
                    console.log("error message below".padEnd(50, "-"));
                    console.log(err);
                    console.log("-".padEnd(50, "-"));
                }
            }
        }
    };
});

// reaction remove 

client.on(Events.MessageReactionRemove, async (reaction, user) => {

    if (reaction.message.id === reactionMessageId) {
        //only triggers for reactions on reactionMessage only

        if (reaction.message.partial) {
            try {
                await reaction.message.fetch();
            } catch (err) {
                console.log("index.js, reaction remove, message partial");
                console.log("error message below".padEnd(50, "-"));
                console.log(err);
                console.log("-".padEnd(50, "-"));
            };
        };

        if (user.partial) {
            try {
                await reaction.message.guild.members.fetch(user.id);
                // await client.channels.cache.get(reactionLogChannelId).send(`🔴 ${userCache.user.username} needs help to remove "${reaction._emoji.name}" role.`);
                // return;
                
            } catch (err) {
                console.log("index.js, reaction remove, user partial");
                console.log("error message below".padEnd(50, "-"));
                console.log(err);
                console.log("-".padEnd(50, "-"));
            };
        };
        
        if (rolesObj[reaction._emoji.name]) {
            try {
                await reaction.message.guild.members.fetch(user.id);
                let roleToRemove = await reaction.message.guild.roles.cache.get(rolesObj[reaction._emoji.name]);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(roleToRemove);

                //if custom emoji 
                if (reaction._emoji.id){
                    await client.channels.cache.get(reactionLogChannelId).send(`${user.username} has removed reaction <:${reaction._emoji.name}:${reaction._emoji.id}>, role "${roleToRemove.name}" has been removed.`);
                    return;
                };
                await client.channels.cache.get(reactionLogChannelId).send(`${user.username} has removed reaction ${reaction._emoji.name}, role "${roleToRemove.name}" has been removed.`);
                return;

            } catch (err) {
                //console.log(`${user.username} faced an error in role removing with reaction removing`);
                console.log(err);
                console.log("-".padEnd(50, "-"));

                try {
                    //send role error message to logs channel
                    await client.channels.cache.get(reactionLogChannelId).send(`🔴 ${user.username} needs help to remove "${reaction._emoji.name}" role.`);

                } catch (err) {
                    console.log("index.js, reaction remove");
                    console.log("error message below".padEnd(50, "-"));
                    console.log(err);
                    console.log("-".padEnd(50, "-"));
                }
            }
        }
    };
});

// log bot onto discord

client.on('ready', async (c) => {
    console.log("Shuu is Online on Discord");
    const currentTime = new Date();
    console.log(`${currentTime}`);

    //activitytype set 
    client.user.setActivity({
        name: "the sunset",
        type: ActivityType.Watching,
    });
    console.log("-".padEnd(50, "-"));
});

client.login(process.env.DISCORD_TOKEN);

//node .\index.js
//"start": "node bot.js"
//
