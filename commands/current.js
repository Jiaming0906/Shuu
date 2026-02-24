//current timestamp command

const { SlashCommandBuilder, EmbedBuilder, inlineCode, MessageFlags } = require('discord.js');
//const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, inlineCode, codeBlock, time } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('current-timestamp')
        .setDescription('Current time')
        .setIntegrationTypes(0, 1)
        .setContexts(0, 1, 2),
        
    async execute(interaction) {

        //
        const currentTime = Date.now();
        const time = `${Math.ceil(currentTime/1000) + 0*60}`;
        
        // <t:00000000000:R> countdown <t:00000000000:T> 0:00pm <t:00000000000:F> full
        await interaction.reply({ content: `It is <t:${time}:T>` });
        return;
    }
};
