const { Events, MessageFlags } = require('discord.js');
const { db } = require('../model/database.js'); // Changed to import db

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    // Handle select menu first (components can't be chat commands)
    if (interaction.isStringSelectMenu() && interaction.customId === 'option-select') {
      try {
        await interaction.deferUpdate(); // Acknowledge immediately
        
        const choice = interaction.values[0];
        const userId = interaction.user.id;
        const username = interaction.user.username;

        // Use db from your database.js //choice
        db.prepare(`
          INSERT INTO user_choices (user_id, username, choice)
          VALUES (?, ?, ?)
          ON CONFLICT(user_id) DO UPDATE SET
            username = excluded.username,
            choice = excluded.choice,
            timestamp = CURRENT_TIMESTAMP
        `).run(userId, username, choice);

        // await interaction.editReply({
        //   components: interaction.message.components,
        // });
        
        // Send private confirmation
        await interaction.followUp({
          content: `You selected.`,
          flags: MessageFlags.Ephemeral,
        });

      } catch (error) {
        console.error('Select Menu Error:', error);
        // Try multiple fallback responses
        await interaction.followUp({
            content: '❌ An error occurred while processing your selection. Please try again later.',
            flags: MessageFlags.Ephemeral,
        });
      }
      return; // Important: Stop further processing
    }

    // Then handle chat commands
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error('Command Error:', error);
        await interaction.reply({
          content: 'There was an error executing this command.',
          ephemeral: true
        });
      }
    }
  }
};