const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("brackets")
        .setDescription("Randomise Brackets")
        .addIntegerOption(option => option.setName("number")
            .setDescription("Number of Teams")
            .setMinValue(0)
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        //
        const { options } = interaction;
        const num = options.getInteger("number");

        if (num === 0) {
            await interaction.reply("Please enter a number larger than zero!");
            return;
        };

        //
        // function createArray(N) {
        //     return [...Array(N).keys()].map(i => i + 1);
        // }

        function createArray(N) {
            let newArr = [];
            for (let i = 1; i <= N; i++) {
                newArr.push(i);
            }
            return newArr;
        };

        function getRandomInt(max) {
            return Math.floor(Math.random() * max);//0,...,max-1
        };

        //
        let arrayNum = createArray(num);//[1,...,num]

        //
        let results = "";//want "1 vs 2\n"3 vs 4\n...\n10 vs 11"]

        //loop
        try {
            //
            for (let i = 1; i <= Math.floor(num/2); i++) {
                let temp = "";
                let r = getRandomInt(arrayNum.length);
                temp = temp.concat("Team ", arrayNum[r]);
                arrayNum.splice(r, 1);//start index, how many to remove
                r = getRandomInt(arrayNum.length);
                temp = temp.concat(" vs ");
                temp = temp.concat("Team ", arrayNum[r]);
                results = results.concat(temp, "\n");
                arrayNum.splice(r, 1);
    
                // console.log("temp", temp);
                // console.log(r);
                // console.log(arrayNum);
                // console.log(results);
                // console.log("-");
            };

            if (arrayNum.length > 0) {
                let t = "";
                t = t.concat(arrayNum[0]);
                results = results.concat("Team ", t, " round bye");
            };

            await interaction.reply(results);
            return;

        } catch (err) {
            console.log(err);
            await interaction.reply("There is some issue, sorry.");
            return;
        };
    }
};