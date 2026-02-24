const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('flag')
    .setDescription('Flag a message and send a warning to another channel')
    .addStringOption(option =>
      option.setName('messageid')
        .setDescription('The ID of the message to flag')
        .setRequired(true)
    )
    .addChannelOption(option =>
      option.setName('targetchannel')
        .setDescription('The channel to send the warning to')
        .setRequired(true)
    )
    .setIntegrationTypes(0),

  async execute(interaction) {
    const messageId = interaction.options.getString('messageid');
    const targetChannel = interaction.options.getChannel('targetchannel');
    const sourceChannel = interaction.channel;

    try {
      // Fetch the flagged message
      const flaggedMessage = await sourceChannel.messages.fetch(messageId);

      // Compose the warning
      const warning = `Dear friends, I understand it's unintentional but please do not send messages in <#${sourceChannel.id}>. Thank you.`;

      // Send warning to target channel
      await targetChannel.send(warning);

      // Optionally react to the original message
      // await flaggedMessage.react('⚠️');

      // Confirm to the command user
      await interaction.reply({ content: 'Message has been flagged and reported.',  flags: MessageFlags.Ephemeral });
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: 'Failed to fetch the message. Make sure the message ID is correct and in this channel.', flags: MessageFlags.Ephemeral });
    }
  },
};
