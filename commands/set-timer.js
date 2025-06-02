const { SlashCommandBuilder, inlineCode, EmbedBuilder, MessageFlags } = require("discord.js");
const { ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("set-timer")
        .setDescription("Sets a timer")
        .addStringOption(option => option.setName("minutes")
            .setDescription("Sets a timer according to minutes given")
            .addChoices(
                { name: "1", value: "60" },
                { name: "1.5", value: "90" },
                { name: "2", value: "120" },
            )
        .setRequired(true))
        .setIntegrationTypes(0, 1)
        .setContexts(0, 1, 2),

    async execute(interaction) {
        //setintegrationtypes 0=guild 1=user
        //setcontexts = use in group chat=2, dm=0, servers=1
        try {
            //
            const { options } = interaction;
            var total = parseInt(options.getString("minutes"));

            // await interaction.reply({ content: "Not ready T^T", ephemeral: true });
            // return;

            //create button
            // const button = new ButtonBuilder()
            //     .setLabel("End")
            //     .setStyle(ButtonStyle.Danger)
            //     .setCustomId("end-button")

            // const row = new ActionRowBuilder()
            //     .addComponents(button)

            async function sendMessage(message, edit) {
                const embed = new EmbedBuilder()
                .setColor("ab233d")
                .setDescription(message)
                //.setFooter({ text: "Please do not delete me before timer is up."})

                try {
                    if (edit) {
                        if (message === `Timer's up!`) {
                            await interaction.editReply({ embeds: [embed] });
    
                            // console.log(`Timer done!`);
                            return;
                        };
                        await interaction.editReply({ embeds: [embed] });
                    } else {
                        await interaction.reply({ embeds: [embed] });
                    }
                } catch (err) {
                    //ignore;
                };

            };

            var current = 0;
            // var total = 60;
            await sendMessage(`${total - current} seconds left`);

            var done;
            if (done) return;
            
            setInterval(async () => {
                if (done) return;
                current++;

                if (current >= total) {
                    await sendMessage(`Timer's up!`, true);
                    done = true;
                } else {
                    await sendMessage(`${inlineCode(total - current)} seconds left`, true);
                }
            }, 1000);

            return;


            // if (!nameUser) {
            //     await interaction.reply({ content: `Watching over all <:seer4:1171826495094784000>`})
            // };

            // if (nameUser) {
            //     await interaction.reply({ content: `I am protecting <@${nameUser.id}> <:seer5:1171826490468466791>` });
            // };
            
            // //await interaction.reply({ content: `sheeeesh, girl <:sheesh:1167310481871089675>`, files: [ {attachment: "./pictures/sheesh.png", name: "sheesh1.png"} ], tts: true });

            // //
            // setTimeout(async () => {
            //     await interaction.editReply({ content: `<:seer1:1171826486701981831>` });
            // }, 8000)

        } catch (err) {
            console.log(err)
        };
    }
        
};