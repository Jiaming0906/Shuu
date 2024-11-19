//flips a coin and returns heads or tails

const { SlashCommandBuilder, EmbedBuilder, inlineCode } = require('discord.js');
//const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, inlineCode, codeBlock, time } = require('discord.js');

const cheerio = require('cheerio');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('define')
        .setDescription('Defines a word')
        .addStringOption(option => option.setName("word")
            .setDescription("Word to define")
            .setRequired(true))
        .setIntegrationTypes(0, 1)
        .setContexts(0, 1, 2),
        
    async execute(interaction) {

        //
        const { options } = interaction;
        const word = options.getString('word');
        const geturl = "https://www.dictionary.com/browse/" + word;

        await interaction.deferReply();
        
        try {
            //web scrap
            const axiosResponse = await axios.request({
                method: "GET",
                url: geturl,
                headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
                }
            })

            const $ = cheerio.load(axiosResponse.data);

            const htmlElement = $(".NZKOFkdkcvYgD3lqOIJw");

            let definition = "";
            htmlElement.each((i, div) => {

                let toadd = $(div).text();
                if (toadd[0] === " ") {
                    definition += "-";
                };
                definition += toadd;
                definition += "\n";
            });

            // const definition = htmlElement.text();
            await interaction.editReply({ content: `${word}:\n${definition}-# From <${geturl}>` });
            return;

        } catch (err) {
            console.log(err);
            await interaction.editReply({ content: `You gave a bad word.` });
            return;

        };
    }
};
