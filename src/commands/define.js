//flips a coin and returns heads or tails

const { SlashCommandBuilder, EmbedBuilder, inlineCode } = require('discord.js');
//const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, inlineCode, codeBlock, time } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ask')
        .setDescription('Ask magic ball')
        .addStringOption(option => option.setName("question")
            .setDescription("The question to ask")
            .setRequired(true))
        .setIntegrationTypes(0, 1)
        .setContexts(0, 1, 2),
        
    async execute(interaction) {

        //
        const { options } = interaction;
        const question = options.getString('question');
        
        try {
            //
            const number = Math.random();

            if (number < 1/5) {
                await interaction.reply({ content : `+#yes`} );
            } else if (number < 2/5) {
                await interaction.reply({ content: `# big yes`} );
            } else if (number < 3/5) {
                await interaction.reply({ content: `+#no`} );
            } else if (number < 4/5) {
                await interaction.reply({ content: `# big no`} );
            } else {
                await interaction.reply({ content: `maybe` } );
            };

            return;

        } catch (err) {
            console.log(err);
            await interaction.reply({ content: `You gave a bad question.` });
            return;

        };
    }
};
