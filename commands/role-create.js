const { SlashCommandBuilder, EmbedBuilder, inlineCode, MessageFlags } = require('discord.js');
//const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, inlineCode, codeBlock, time } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-role')
        .setDescription('Creates a new role with minimum permissions')
        .addStringOption(option => option.setName("name")
            .setDescription("Name of the role to be created")
            .setRequired(true))
        .setIntegrationTypes(0),
        
    async execute(interaction) {

        const { options } = interaction;
        const name = options.getString("name");

        //create a role at position 1
        try {
            await interaction.guild.roles.create({
                name: `${name}`,
                //position: 2,
            });

            await interaction.reply({ content: `Role created for ${inlineCode(name)}`, flags: MessageFlags.Ephemeral });                    
            return;

        } catch(err) {
            console.log(err);
            await interaction.reply({ content: "Please move the bot to a higher position.", flags: MessageFlags.Ephemeral });
            return;

        };

    }
};
