const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("speak")
        .setDescription("Speaks in a Channel")
        .addStringOption(option => option.setName("channel-id")
            .setDescription("Channel ID")
            .setRequired(true))
        .addStringOption(option => option.setName("message")
            .setDescription("Message to Speak")
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
        
    async execute(interaction) {
        //
        const { options } = interaction;
        const channelId = options.getString("channel-id");
        const msg = options.getString("message");

        const d = new Date();
        const hr = String(d.getHours()).padStart(2, "0");
        const min = String(d.getMinutes()).padStart(2, "0");
        const sec = String(d.getSeconds()).padStart(2, "0");

        let t = `Time is ${hr}:${min}:${sec} (+0800).`;

        //
        await interaction.client.channels.cache.get(channelId).send({ content: `${msg} ${t}` });
        await interaction.reply({ content: `Sent!`, ephemeral: true });
        return;
    }
};