const { SlashCommandBuilder, inlineCode, PermissionFlagsBits } = require("discord.js");
//.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

module.exports = {
    data: new SlashCommandBuilder()
        .setName("check-role")
        .setDescription("Shows all with the specified role")
        .addRoleOption(option => option.setName("role")
            .setDescription("Choose the role")
            .setRequired(true)),
    
    async execute(interaction) {
        
        const { options } = interaction;
        const rolecurrent = options.getRole("role");

        try {
            //get all members

            await interaction.deferReply({ ephemeral: true });

            memberGet = await interaction.guild.members.fetch();

            let list = ``;

            memberGet.forEach((member) => {
                if (member.roles.cache.has(rolecurrent.id)) {
                    //add to list
                    list += member.displayName;
                    list += "\n";
                };
            });

            //console.log(list);

            //await interaction.member.roles.add(targetRole);
            //await interaction.reply(`Role ${targetRole} has been added for <@${targetUser.id}>.`)
            await interaction.editReply({ content: `${list}`, ephemeral: true });
            return;

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
            await interaction.reply({ content: "I do not have permission to assign that role.", ephemeral: true });
            return;
        };
    }
};