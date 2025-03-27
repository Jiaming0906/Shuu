const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true, //runs only once
    async execute(client) {
        console.log("Assistant is Online on Discord");
        const currentTime = new Date();
        console.log(`${currentTime}`);
        
        //activitytype set 
        client.user.setActivity({
            name: "BOSS",
            type: ActivityType.Listening,
        });
        console.log("-".padEnd(50, "-"));
    }
};