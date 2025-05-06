const { SlashCommandBuilder, inlineCode, PermissionFlagsBits } = require("discord.js");
//.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

module.exports = {
    data: new SlashCommandBuilder()
        .setName("add-all")
        .setDescription("Adds a role for all members with a specified role")
        .addRoleOption(option => option.setName("rolecurrent")
            .setDescription("Choose the current role")
            .setRequired(true))
        .addRoleOption(option => option.setName("roletoadd")
            .setDescription("Choose the role to add")
            .setRequired(true))
        .setIntegrationTypes(0)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
    async execute(interaction) {

        //setintegrationtypes 0=guild 1=user
        //setcontext = use in group chat=2, dm=0, servers=1
        
        const { options } = interaction;
        const rolecurrent = options.getRole("rolecurrent");
        const roletoadd = options.getRole("roletoadd");

        try {
            //get all members

            await interaction.deferReply({ ephemeral: true });

            memberGet = await interaction.guild.members.fetch(); 

            const list = [];

            memberGet.forEach((member) => {
                if (member.roles.cache.has(rolecurrent.id)) {
                    //add to list
                    list.push(member.id);
                }
            });

            //console.log(list);

            for (let i = 0; i < list.length; i++) {
                m = await interaction.guild.members.cache.get(list[i]);
                //console.log(`ok`);
                await m.roles.add(roletoadd);
            };

            //await interaction.member.roles.add(targetRole);
            //await interaction.reply(`Role ${targetRole} has been added for <@${targetUser.id}>.`)
            await interaction.editReply({ content: `Done.`, ephemeral: true });
            return;

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
            await interaction.editReply({ content: "I do not have permission to assign that role.", ephemeral: true });
            return;
        };
    }
};