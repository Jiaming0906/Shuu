const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("automod")
        .setDescription("Setup automod rules")
        .addSubcommand(command => command.setName("flagged-words")
            .setDescription("Block profanity, sexual content, and slurs"))
        .addSubcommand(command => command.setName("spam-message")
            .setDescription("Block messages suspected of spam"))
        .addSubcommand(command => command.setName("keyword")
            .setDescription("Block a given keyword in the server")
            .addStringOption(option => option.setName("word")
                .setDescription("The word to block")
                .setRequired(true)))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
        
    async execute(interaction) {

        const { guild, options } = interaction;
        const sub = options.getSubcommand();

        //
        switch (sub) {

            //flagged words deemed by discord to be profanity, sexual content and slurs

            case `flagged-words`:

            await interaction.reply({ content: `Loading your Auto Moderation Rule...` });

            const rule = await guild.autoModerationRules.create({
                name: `Block profanity, sexual content and slurs`,
                creatorId: `1164417246643367968`,
                enabled: true,
                eventType: 1,
                triggerType: 4,
                triggerMetadata: {
                    presets: [1, 2, 3]
                },
                actions: [
                    {
                        type: 1,
                        metadata: {
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessage: `Your message contents inappropriate contents. Please be mindful of your words.`
                        }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    console.log(err);
                    await interaction.editReply({ content: `There is an error creating the Auto Moderation Rule. Please let Sneaky know about this.`});
                }, 2000)
            })

            setTimeout(async () => {
                if (!rule) return;

                await interaction.editReply({ content: `The Auto Moderation Rule has been successfully created. All profanity, sexual content and slurs will be stopped.`})
            }, 3000)

            break;


            // to add banned keyword, up to 6

            case `keyword`:
            
            await interaction.reply({ content: `Loading your Auto Moderation Rule...` });
            const word = options.getString("word");

            const rule2 = await guild.autoModerationRules.create({
                name: `Ban ${word}`,
                creatorId: `1164417246643367968`,
                enabled: true,
                eventType: 1,
                triggerType: 1,
                triggerMetadata: {
                    keywordFilter: [`${word}`]
                },
                actions: [
                    {
                        type: 1,
                        metadata: {
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessage: `Your message contents inappropriate contents. Please be mindful of your words.`
                        }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    console.log(err);
                    await interaction.editReply({ content: `There is an error creating the Auto Moderation Rule. Please let Sneaky know about this.`});
                }, 2000)
            })

            setTimeout(async () => {
                if (!rule2) return;

                await interaction.editReply({ content: `The Auto Moderation Rule has been successfully created. The keyword "${word}" has been banned.`})
            }, 3000)

            break;


            // block spam messages

            case `spam-message`:

            await interaction.reply({ content: `Loading your Auto Moderation Rule...` });

            const rule3 = await guild.autoModerationRules.create({
                name: `Block spam messages`,
                creatorId: `1164417246643367968`,
                enabled: true,
                eventType: 1,
                triggerType: 3,
                triggerMetaData: {
                    //presets: [1, 2, 3]
                },
                actions: [
                    {
                        type: 1,
                        metadata: {
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessage: `Your message contents inappropriate contents. Please be mindful of your words.`
                        }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    console.log(err);
                    await interaction.editReply({ content: `There is an error creating the Auto Moderation Rule. Please let Sneaky know about this.`});
                }, 2000)
            })

            setTimeout(async () => {
                if (!rule3) return;

                await interaction.editReply({ content: `The Auto Moderation Rule has been successfully created. All spam messages will be stopped.`})
            }, 3000)

            break;
        }
    }
};