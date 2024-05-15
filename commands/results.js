const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("results")
        .setDescription("Results template")
        .addStringOption(option => option.setName("map")
            .setDescription("Choose the map")
            .addChoices(
                { name: "Eversleeping Town", value: "Eversleeping Town" },
                { name: "Red Church", value: "Red Church" },
                { name: "Lakeside Village", value: "Lakeside Village"},
                { name: "Arms Factory", value: "Arms Factory" },
                { name: "Sacred Heart Hospital", value: "Sacred Heart Hospital" },
                { name: "Moonlit River Park", value: "Moonlit River Park" },
                { name: "Chinatown", value: "Chinatown" },
                { name: "Leo's Memory", value: "Leo's Memory" }
            )
            .setRequired(true))
        .addStringOption(option => option.setName("win-by")
            .setDescription("Win by Options")
            .addChoices(
                { name: "Points", value: "Points" },
                { name: "Time", value: "Time" },
                { name: "Decoded", value: "Decoded" },
            )
            .setRequired(true))
        .addRoleOption(option => option.setName("winner-team")
            .setDescription("Tag of Winner Team")
            .setRequired(true))
        .addRoleOption(option => option.setName("loser-team")
            .setDescription("Tag of Loser Team")
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        //
        try {
            //all variables
            const { options } = interaction;
            const map = options.getString("map");
            const winBy = options.getString("win-by");
            const winnerTeam = options.getRole("winner-team");
            const loserTeam = options.getRole("loser-team");

            //colour of embed 
            const colourEmbed = "#8E7AF0";

            //Title
            const titleEmbed = `Results for ${winnerTeam} vs ${loserTeam}`;

            //Decription
            const desEmbed = `Results for ${winnerTeam} vs ${loserTeam}\nMap: **${map}**\n**${winnerTeam.name}** wins by **${winBy}**`;

            //create embed
            const embed = new EmbedBuilder()
            .setColor(colourEmbed)
            .setDescription(desEmbed)

            await interaction.reply({ embeds: [embed] });
            return;
            
        } catch (err) {
            console.log(err);
            console.log("-".padEnd(50, "-"));
        };
    }
};