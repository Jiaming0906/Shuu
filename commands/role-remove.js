const { SlashCommandBuilder, inlineCode, PermissionFlagsBits, MessageFlags } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("remove-role")
        .setDescription("Removes a role for the member")
        .addUserOption(option => option.setName("member")
            .setDescription("Choose the member")
            .setRequired(true))
        .addRoleOption(option => option.setName("role")
            .setDescription("Choose the role to remove")
            .setRequired(true))
        .setIntegrationTypes(0),
    
    async execute(interaction) {

        const { options } = interaction;
        const targetUser = options.getUser("member");
        const targetRole = options.getRole("role");

        try {

            await interaction.deferReply({ flags: MessageFlags.Ephemeral });
            
            //check if member has the role user is trying to remove 
            mem = await interaction.guild.members.cache.get(targetUser.id);
            memberGet = await mem.roles.cache.has(targetRole.id)
            
            if (!memberGet) {
                await interaction.editReply({ content: `<@${targetUser.id}> does not have the Role ${targetRole}!`, flags: MessageFlags.Ephemeral });
                return;
            }

            //check if bot has permission to remove

            //get position of bot role 
            const rolesAll = []; //list of all roles in the guild
            await interaction.guild.roles.cache.forEach(role => rolesAll.push(role));

            const allBotRoles = rolesAll.filter(role => role.tags);
            const botRole = allBotRoles.filter(role => role.tags.botId === "1164417246643367968");
            const positionBotRole = botRole[0].position;

            //get position of role to remove
            const rolePosition = targetRole.position;

            if (rolePosition >= positionBotRole || targetRole.tags) {
                await interaction.editReply({ content: `I do not have the permission to remove this role.`, flags: MessageFlags.Ephemeral });
                return;
            };

            await mem.roles.remove(targetRole);
            await interaction.editReply(`Role ${targetRole} has been removed from <@${targetUser.id}>.`)
            return;

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
            await interaction.editReply({ content: `Error. You could be trying to remove a role that I don't have the permissions to.`, flags: MessageFlags.Ephemeral });
            return;
        };
    }
};