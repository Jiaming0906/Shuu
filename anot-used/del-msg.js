const { SlashCommandBuilder, inlineCode, PermissionFlagsBits } = require("discord.js");
//.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

module.exports = {
    data: new SlashCommandBuilder()
        .setName("del-msg")
        .setDescription("Delete messages given the user id")
        .addStringOption(option => option.setName("userid")
            .setDescription("User id")
            .setRequired(true)),
    
    async execute(interaction) {
        
        const { options } = interaction;
        const userId = options.getString("userid");

        if (!interaction.guild) {
            await interaction.editReply({ content: `Not a guild!` });
            return;
        };

        try {
            //get all members

            await interaction.deferReply();

            //interaction.guild.channels.fetch()

            let channelGet = await interaction.guild.channels.fetch();
            let alltextchannels = [];

            channelGet.forEach((channel) => {
                if (channel.type === 0){
                    alltextchannels.push(channel);
                };
            });

            async function findMessage(userid) {
                for (let current of alltextchannels) {

                    //console.log(current.name);

                    let message10 = [];

                    let messageGet = await current.messages.fetch({ limit: 10 });

                    messageGet.forEach((message) => {
                        // console.log(message.author.id);

                        // console.log(userid === message.author.id);

                        if (message.author.id === userid) {
                            message.delete();
                        };
                    });

                }
            };

            await findMessage(userId);
            
            await interaction.editReply({ content: `OK, deleted those scammy spammy messages from all channels` });
            return;

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
            //await interaction.reply({ content: "I do not have permission to do this.", ephemeral: true });
            return;
        };
    }
};