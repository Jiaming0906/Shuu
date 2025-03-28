const { Events } = require('discord.js');
const roleQueue = require('../utils/roleQueue');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {

        //config
        const roleId = "1354847823895728240";
        const welcomeChannelId = "1176055204358139967";

        //
        try {
            //get the role
            const role = await member.guild.roles.fetch(roleId);
            if (!role) throw new Error("Role not found.");

            //assign the role
            // await member.roles.add(role);

            //add to queue
            if (role) {
                roleQueue.add(member, roleId);
            };

            //send welcome message
            const welcomeChannel = await member.guild.channels.fetch(welcomeChannelId);

            if (welcomeChannel) {
                await welcomeChannel.send(`Welcome ${member}!`);
            };
        } catch (error) {
            console.log("Error in new member events handler", error);
        };
    }
};