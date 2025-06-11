const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-information')
        .setDescription('Save or retrieve information')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Text to save or leave empty to retrieve')
                .setRequired(false)),
    
    async execute(interaction) {
        
        // add defer reply
        await interaction.deferReply();

        const textToSave = interaction.options.getString('text');
        const timestamp = new Date().toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });

        const TEXT_FILE_PATH = path.join(__dirname, `/../text/text_for_channel_${interaction.channelId}.txt`);

        try {
            if (textToSave) {
                // Save mode with timestamp
                const entry = `-# [${timestamp}]\n${textToSave}\n`;
                fs.appendFileSync(TEXT_FILE_PATH, entry);
                
                await interaction.editReply({
                    content: `OK!\n-# ${timestamp}`,
                });
            } else {
                // Retrieve mode
                if (!fs.existsSync(TEXT_FILE_PATH) || fs.readFileSync(TEXT_FILE_PATH, 'utf8').trim() === '') {
                    return interaction.editReply({
                        content: 'No text has been saved yet.',
                    });
                }

                const savedText = fs.readFileSync(TEXT_FILE_PATH, 'utf8');
                await interaction.editReply({
                    content: `${savedText}`,
                });
            }
        } catch (error) {
            console.error('Error handling savedtext:', error);
            await interaction.editReply({
                content: 'Failed to access text storage.',
            });
        }
    }
};