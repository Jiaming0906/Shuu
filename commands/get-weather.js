const cheerio = require('cheerio');
const axios = require('axios');

// //weather 
// const weather = ["-", "-"];
// const tempMaxMin = ["-", "-"];

// //download website 
// async function performScraping() {
//     // downloading the target web page
//     // by performing an HTTP GET request in Axios
//     const axiosResponse = await axios.request({
//         method: "GET",
//         url: "https://www.google.com/search?q=weather&oq=weather&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GJ0CGIoFMg4IABBFGCcYOxidAhiKBTIGCAEQRRhAMg8IAhAAGEMYgwEYsQMYigUyEggDEAAYQxiDARixAxjJAxiKBTIGCAQQRRg8MgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEIMTE3OWoxajSoAgCwAgA&sourceid=chrome&ie=UTF-8",
//         headers: {
//     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
//         }
//     })

//     // parsing the HTML source of the target web page with Cheerio
//     const $ = cheerio.load(axiosResponse.data);

//     const htmlElement = $(".UQt4rd");
//     const $w = htmlElement.children("img").attr("alt");

//     const temp = $(".vk_bk.TylWce.SGNhVe");
//     const $temp = temp.children(".wob_t.q8U8x");

//     weather.pop();
//     tempMaxMin.pop();
    
//     weather.push(String($w).toLowerCase());
//     tempMaxMin.push($temp.text())

//     // console.log(`w: ${weather}`);
//     // console.log(`t: ${tempMaxMin}`);
// };

// performScraping().catch((err) => {
//     console.log(err);
// });

// //weather.slice(-1)

//

//flips a coin and returns heads or tails

const { SlashCommandBuilder, EmbedBuilder, inlineCode } = require('discord.js');
//const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, inlineCode, codeBlock, time } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-weather')
        .setDescription('Weather of my location'),

    async execute(interaction) {

        await interaction.deferReply();

        let des = "test";
        let temp = "test";
        let city = "Singapore";
        let humidity = "test";
        let wind = "test";
        let windDir = "test";

        //weather 
        async function getWeatherDescription(city) {
        try {
            const response = await axios.get(`https://wttr.in/${city}?format=j1`);
            const currentCondition = response.data.current_condition[0];
            const description = currentCondition.weatherDesc[0].value; // e.g., "Partly cloudy"

            //console.log(`Current weather in ${city}: ${description}`);

            //des = partly cloudy
            des = description;

            //temp
            const tempC = currentCondition.temp_C;
            temp = tempC;

            //humidity
            humidity = currentCondition.humidity;

            //wind
            wind = currentCondition.windspeedKmph;

            //wind direction
            windDir = currentCondition.winddir16Point;

        } catch (error) {
            console.error("Error fetching weather:", error);
        }
        }

        await getWeatherDescription("Singapore");
        await interaction.editReply({ content: `Current weather in ${city}: ${des}\nTemperature: ${temp}℃\nHumidity: ${humidity}%\nWind: ${wind} km/h ${windDir}` });
        //await interaction.reply({ content: `Coin Flip for ${team1role} and ${team2role}`, embeds: [ embed ] });
        return;
    }
};
