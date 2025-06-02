//flips a coin and returns heads or tails

const { SlashCommandBuilder, EmbedBuilder, inlineCode, MessageFlags } = require('discord.js');
//const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, inlineCode, codeBlock, time } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-timestamp')
        .setDescription('Set a timestamp from now up to 7 days')
        .addIntegerOption(option => option.setName("minutes")
        .setDescription("Choose a number between 1 and 10080")
        .setMinValue(1)
        .setMaxValue(10080)
        .setRequired(true))
        .addStringOption(option => option.setName("words-before")
            .setDescription("Words before the timestamp"))
        .addStringOption(option => option.setName("words-after")
            .setDescription("Words after the timestamp"))
        .setIntegrationTypes(0, 1)
        .setContexts(0, 1, 2),
        
    async execute(interaction) {
        
        //
        const { options } = interaction;
        const min = options.getInteger("minutes");
        let wordsBefore = options.getString("words-before");
        let wordsAfter = options.getString("words-after");

        if (!wordsBefore) {
            //empty
            wordsBefore = "Timer's done at";
        };

        if (!wordsAfter) {
            //empty
            wordsAfter = "";
        };

        //
        const currentTime = Date.now();
        const time = `${Math.ceil(currentTime/1000) + min*60}`;
        
        // <t:00000000000:R> countdown <t:00000000000:T> 0:00pm <t:00000000000:F> full
        await interaction.reply({ content: `${wordsBefore} <t:${time}:T> <t:${time}:R> ${wordsAfter}` });
        return;
    }
};
