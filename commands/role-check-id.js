const { SlashCommandBuilder, inlineCode, PermissionFlagsBits, MessageFlags } = require("discord.js");
//.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

module.exports = {
    data: new SlashCommandBuilder()
        .setName("check-role-id")
        .setDescription("Checks id of a role")
        .addRoleOption(option => option.setName("role")
            .setDescription("Choose the role")
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setIntegrationTypes(0),
    
    async execute(interaction) {
        
        const { options } = interaction;
        const targetRole = options.getRole("role");

        try {

            await interaction.reply({ content: `name = ${targetRole.name}\ncolour = ${targetRole.hexColor}\nid = ${targetRole.id}\nposition = ${targetRole.position}\n-# created on ${targetRole.createdAt}` });
            return;

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
            await interaction.reply({ content: "Error." });
            return;
        };
    }
};