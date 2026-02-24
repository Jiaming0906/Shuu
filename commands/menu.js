const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { statements } = require('../model/database.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('menu')
    .setDescription('Choose'),
  
  async execute(interaction) {
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId('option-select')
      .setPlaceholder('Would you...?')
      .addOptions([
        { label: 'YES', value: 'A', emoji: '❗' },
        //{ label: 'Option B', value: 'B', emoji: '🅱️' }
      ]);

    await interaction.reply({
      content: '**Please select an option:**',
      components: [new ActionRowBuilder().addComponents(selectMenu)]
    });
  }
};